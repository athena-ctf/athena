use std::collections::HashMap;
use std::sync::LazyLock;

use bollard::auth::DockerCredentials;
use bollard::container::{
    Config as ContainerConfig, CreateContainerOptions, RemoveContainerOptions,
    StartContainerOptions,
};
use bollard::image::{BuildImageOptions, PushImageOptions};
use bollard::secret::{HostConfig, PortBinding};
use bollard::Docker;
use docker_compose_types::{
    Command, ComposeNetworks, ComposeSecrets, Environment, Ports, Services, TopLevelVolumes,
};
use futures::StreamExt;
use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;
use utoipa::ToSchema;

use crate::errors::Result;
use crate::schemas::{ContainerMeta, ImageStatus};

pub static IMAGE_PUSH_STATE: LazyLock<RwLock<HashMap<String, ImageStatus>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Default, ToSchema)]
pub struct StrippedCompose {
    #[serde(default, skip_serializing_if = "Services::is_empty")]
    pub services: Services,
    #[serde(default, skip_serializing_if = "TopLevelVolumes::is_empty")]
    pub volumes: TopLevelVolumes,
    #[serde(default, skip_serializing_if = "ComposeNetworks::is_empty")]
    pub networks: ComposeNetworks,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secrets: Option<ComposeSecrets>,
}

#[inline]
pub fn connect() -> Result<Docker> {
    Ok(Docker::connect_with_socket_defaults()?)
}

type ExposedPorts = HashMap<String, HashMap<(), ()>>;
type PortBindings = HashMap<String, Option<Vec<PortBinding>>>;

fn get_ports(ports: &Ports) -> (ExposedPorts, PortBindings) {
    (
        match ports {
            Ports::Short(ports) => ports
                .iter()
                .map(|port| (format!("{port}/tcp"), HashMap::new()))
                .collect(),
            Ports::Long(ports) => ports
                .iter()
                .map(|port| {
                    (
                        format!(
                            "{}/{}",
                            port.target,
                            port.protocol.clone().unwrap_or_else(|| "tcp".to_owned())
                        ),
                        HashMap::new(),
                    )
                })
                .collect(),
        },
        match ports {
            Ports::Short(ports) => ports
                .iter()
                .map(|port| {
                    (
                        format!("{port}/tcp"),
                        Some(vec![PortBinding {
                            host_ip: None,
                            host_port: None,
                        }]),
                    )
                })
                .collect(),
            Ports::Long(ports) => ports
                .iter()
                .map(|port| {
                    (
                        format!(
                            "{}/{}",
                            port.target,
                            port.protocol.clone().unwrap_or_else(|| "tcp".to_owned())
                        ),
                        Some(vec![PortBinding {
                            host_ip: None,
                            host_port: None,
                        }]),
                    )
                })
                .collect(),
        },
    )
}

pub async fn create_instance(docker: &Docker, details: ContainerMeta) -> Result<(u16, String)> {
    let mut app_container_id = String::new();
    let mut app_container_port = 0;

    for (name, service) in details.compose.services.0 {
        let Some(service) = service else {
            continue;
        };

        let (exposed_ports, port_bindings) = get_ports(&service.ports);

        let resp = docker
            .create_container(
                Some(CreateContainerOptions {
                    name,
                    platform: None,
                }),
                ContainerConfig {
                    image: service.image,
                    cmd: service.command.map(|command| match command {
                        Command::Args(cmds) => cmds,
                        Command::Simple(cmd) => vec![cmd],
                    }),
                    env: Some(match service.environment {
                        Environment::List(envs) => {
                            envs.into_iter().map(|env| format!("{env}=")).collect()
                        }
                        Environment::KvPair(kv_pair) => kv_pair
                            .into_iter()
                            .map(|(k, v)| {
                                format!("{k}={}", v.map_or_else(String::new, |v| v.to_string()))
                            })
                            .collect(),
                    }),
                    user: service.user,
                    exposed_ports: Some(exposed_ports),
                    host_config: Some(HostConfig {
                        auto_remove: Some(true),
                        readonly_rootfs: Some(service.read_only),
                        port_bindings: Some(port_bindings),
                        ..Default::default()
                    }),
                    ..Default::default()
                },
            )
            .await?;

        docker
            .start_container(&resp.id, None::<StartContainerOptions<String>>)
            .await?;

        if service
            .container_name
            .as_ref()
            .map_or(false, |name| name == "app")
        {
            app_container_id = resp.id;
            app_container_port = match &service.ports {
                Ports::Long(ports) => ports[0].target,
                Ports::Short(ports) => ports[0].parse().unwrap(),
            }
        }
    }

    let container = docker.inspect_container(&app_container_id, None).await?;

    let host_port = container
        .network_settings
        .unwrap()
        .ports
        .unwrap()
        .iter()
        .find_map(|(k, v)| {
            k.starts_with(&app_container_port.to_string()).then(|| {
                v.as_ref().unwrap()[0]
                    .host_port
                    .as_ref()
                    .unwrap()
                    .parse()
                    .unwrap()
            })
        })
        .unwrap();

    Ok((host_port, app_container_id))
}

pub async fn delete_instance(docker: &Docker, container_id: String) -> Result<()> {
    docker.stop_container(&container_id, None).await?;

    docker
        .remove_container(
            &container_id,
            Some(RemoveContainerOptions {
                force: true,
                v: true,
                link: true,
            }),
        )
        .await?;

    Ok(())
}

pub fn upload_image(
    contents: bytes::Bytes,
    container_name: String,
    challenge_title: String,
    creds: DockerCredentials,
    registry_url: String,
    docker: Docker,
) {
    tokio::spawn(async move {
        IMAGE_PUSH_STATE.write().await.insert(
            format!("{challenge_title}_{container_name}"),
            ImageStatus::Build,
        );

        let mut stream = docker.build_image(
            BuildImageOptions {
                dockerfile: "Dockerfile".to_owned(),
                t: format!("{registry_url}/{challenge_title}_{container_name}"),
                rm: true,
                ..Default::default()
            },
            Some(HashMap::from([(registry_url.clone(), creds.clone())])),
            Some(contents),
        );

        while let Some(chunk) = stream.next().await {
            if let Err(err) = chunk {
                IMAGE_PUSH_STATE.write().await.insert(
                    format!("{challenge_title}_{container_name}"),
                    ImageStatus::Failed,
                );
                panic!("{err}")
            }
        }

        IMAGE_PUSH_STATE.write().await.insert(
            format!("{challenge_title}_{container_name}"),
            ImageStatus::Push,
        );

        let mut stream = docker.push_image(
            &format!("{registry_url}/{challenge_title}_{container_name}"),
            Some(PushImageOptions { tag: "latest" }),
            Some(creds),
        );

        while let Some(chunk) = stream.next().await {
            if let Err(err) = chunk {
                IMAGE_PUSH_STATE.write().await.insert(
                    format!("{challenge_title}_{container_name}"),
                    ImageStatus::Failed,
                );
                panic!("{err}")
            }
        }

        IMAGE_PUSH_STATE.write().await.insert(
            format!("{challenge_title}_{container_name}"),
            ImageStatus::Done,
        );
    });
}
