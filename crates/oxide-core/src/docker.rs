use std::collections::HashMap;
use std::iter::once_with;
use std::sync::LazyLock;

use bollard::auth::DockerCredentials;
use bollard::container::{
    Config as ContainerConfig, CreateContainerOptions, RemoveContainerOptions,
    StartContainerOptions,
};
use bollard::image::{BuildImageOptions, PushImageOptions};
use bollard::secret::{HostConfig, PortBinding};
use bollard::Docker;
use entity::extensions::ContainerMeta;
use futures::StreamExt;
use tokio::sync::RwLock;

use crate::errors::Result;
use crate::schemas::ImageStatus;

pub static IMAGE_PUSH_STATE: LazyLock<RwLock<HashMap<String, ImageStatus>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));

#[inline]
pub fn connect() -> Result<Docker> {
    Ok(Docker::connect_with_socket_defaults()?)
}

pub async fn create_instance(
    name: String,
    flag: String,
    docker: &Docker,
    details: ContainerMeta,
) -> Result<String> {
    let resp = docker
        .create_container(
            Some(CreateContainerOptions {
                name,
                platform: None,
            }),
            ContainerConfig {
                image: Some(details.image),
                cmd: Some(vec![details.cmd]),
                env: Some(
                    details
                        .env
                        .iter()
                        .map(|(k, v)| format!("{k}={v}"))
                        .chain(once_with(|| format!("FLAG=\"{flag}\"")).into_iter())
                        .collect(),
                ),
                exposed_ports: Some(
                    details
                        .ports
                        .iter()
                        .map(|port| (port.to_string(), HashMap::new()))
                        .collect(),
                ),
                host_config: Some(HostConfig {
                    auto_remove: Some(true),
                    port_bindings: Some(
                        details
                            .ports
                            .iter()
                            .map(|port| {
                                (
                                    port.to_string(),
                                    Some(vec![PortBinding {
                                        host_ip: None,
                                        host_port: Some(port.to_string()),
                                    }]),
                                )
                            })
                            .collect(),
                    ),
                    ..Default::default()
                }),
                ..Default::default()
            },
        )
        .await?;

    docker
        .start_container(&resp.id, None::<StartContainerOptions<String>>)
        .await?;

    Ok(resp.id)
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
