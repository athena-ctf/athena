use std::collections::HashMap;

use bollard::container::{
    Config as ContainerConfig, CreateContainerOptions, RemoveContainerOptions,
    StartContainerOptions,
};
use bollard::secret::{HostConfig, PortBinding};
use bollard::Docker;
use entity::extensions::ContainerMeta;

use crate::errors::Result;

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
    let mut env = details
        .env
        .iter()
        .map(|(k, v)| format!("{k}={v}"))
        .collect::<Vec<_>>();
    env.push(format!("FLAG=\"{flag}\""));

    let resp = docker
        .create_container(
            Some(CreateContainerOptions {
                name,
                platform: None,
            }),
            ContainerConfig {
                image: Some(details.image),
                cmd: Some(vec![details.cmd]),
                env: Some(env),
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
