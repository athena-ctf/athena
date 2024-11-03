use std::collections::HashMap;

use bollard::auth::DockerCredentials;
use bollard::container::{Config, CreateContainerOptions, StartContainerOptions};
use bollard::image::CreateImageOptions;
use bollard::network::{ConnectNetworkOptions, CreateNetworkOptions};
use bollard::Docker;
use chrono::{Duration, Utc};
use entity::prelude::*;
use futures::StreamExt;
use sea_orm::prelude::*;
use sea_orm::DbConn;
use uuid::Uuid;

use super::caddy::CaddyApi;
use crate::db;
use crate::errors::{Error, Result};

pub struct Manager {
    docker: Docker,
    caddy_api: CaddyApi,
    db: DbConn,
    registry: String,
    credentials: DockerCredentials,
    flag_len: usize,
    pub container_timeout: i64,
}

impl Manager {
    pub fn new(
        db: DbConn,
        registry: String,
        username: String,
        password: String,
        flag_len: usize,
        container_timeout: i64,
        caddy_api_url: String,
        base_url: String,
    ) -> Result<Self> {
        let docker = Docker::connect_with_local_defaults()?;
        let credentials = DockerCredentials {
            username: Some(username),
            password: Some(password),
            ..Default::default()
        };

        let caddy_api = CaddyApi::new(caddy_api_url, base_url);

        Ok(Self {
            docker,
            caddy_api,
            db,
            registry,
            credentials,
            flag_len,
            container_timeout,
        })
    }

    async fn ensure_image(&self, image: &str) -> Result<()> {
        let registry_image = format!("{}/{}", self.registry, image);

        let options = CreateImageOptions {
            from_image: registry_image.as_str(),
            ..Default::default()
        };

        let mut stream =
            self.docker
                .create_image(Some(options), None, Some(self.credentials.clone()));

        while let Some(result) = stream.next().await {
            result?;
        }

        Ok(())
    }

    pub async fn deploy_challenge(
        &self,
        challenge_model: ChallengeModel,
        container_models: Vec<ContainerModel>,
        player_id: Uuid,
    ) -> Result<(String, HashMap<String, String>)> {
        let mut port_mappings = HashMap::new();

        let expiry = Utc::now().naive_utc() + Duration::seconds(self.container_timeout);
        let subdomain = crate::gen_random(10);

        let deployment_model = db::deployment::create(
            CreateDeploymentSchema {
                hostname: subdomain.clone(),
                expiry,
                challenge_id: challenge_model.id,
                player_id,
            },
            &self.db,
        )
        .await?;

        for container_model in &container_models {
            for network in &container_model.networks {
                self.docker
                    .create_network(CreateNetworkOptions {
                        name: format!("ctf_{}_{}", challenge_model.title, network),
                        internal: container_model.internal,
                        ..Default::default()
                    })
                    .await?;
            }
        }

        let flag = if challenge_model.flag_type == FlagTypeEnum::PerUser {
            let flag = crate::gen_random(self.flag_len);
            crate::db::flag::create(
                CreateFlagSchema {
                    value: flag.clone(),
                    challenge_id: challenge_model.id,
                    player_id: Some(player_id),
                },
                &self.db,
            )
            .await?;

            flag
        } else {
            let Some(flag) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(challenge_model.id))
                .one(&self.db)
                .await?
            else {
                return Err(Error::NotFound("Flag not found".to_owned()));
            };

            flag.value
        };

        let mut deployed = Vec::new();
        while deployed.len() < container_models.len() {
            for container in &container_models {
                if deployed.contains(&container.name) {
                    continue;
                }

                if !container
                    .depends_on
                    .iter()
                    .all(|dep| deployed.contains(dep))
                {
                    continue;
                }

                self.ensure_image(&container.image).await?;

                let mut port_bindings = HashMap::new();
                let mut exposed_ports = HashMap::new();

                for &container_port in &container.ports {
                    if !container.internal {
                        port_bindings.insert(
                            format!("{container_port}/tcp"),
                            Some(vec![bollard::models::PortBinding {
                                host_ip: Some("0.0.0.0".to_string()),
                                host_port: None,
                            }]),
                        );
                    }
                    exposed_ports.insert(format!("{container_port}/tcp"), HashMap::new());
                }

                let container_info = self
                    .docker
                    .create_container(
                        Some(CreateContainerOptions {
                            name: format!("ctf_{}_{}", challenge_model.title, container.name),
                            ..Default::default()
                        }),
                        Config {
                            image: Some(format!("{}/{}", self.registry, container.image)),
                            env: Some(
                                [container.environment.clone(), vec![format!("FLAG={flag}")]]
                                    .concat(),
                            ),
                            exposed_ports: Some(exposed_ports),
                            cmd: Some(container.command.clone()),
                            labels: Some(HashMap::from([(
                                "caddy".to_owned(),
                                format!("{subdomain}.{}", ""),
                            )])),
                            host_config: Some(bollard::models::HostConfig {
                                port_bindings: Some(port_bindings),
                                memory: Some(i64::from(container.memory_limit) * 1024 * 1024),
                                ..Default::default()
                            }),
                            ..Default::default()
                        },
                    )
                    .await?;

                for network in &container.networks {
                    let network_name = format!("ctf_{}_{network}", challenge_model.title);
                    self.docker
                        .connect_network(
                            &network_name,
                            ConnectNetworkOptions {
                                container: container_info.id.as_str(),
                                ..Default::default()
                            },
                        )
                        .await?;
                }

                self.docker
                    .start_container(&container_info.id, None::<StartContainerOptions<String>>)
                    .await?;

                if !container.internal {
                    let details = self
                        .docker
                        .inspect_container(&container_info.id, None)
                        .await?;
                    if let Some(network_settings) = details.network_settings {
                        if let Some(ports) = network_settings.ports {
                            for (container_port, bindings) in ports {
                                if let Some(bindings) = bindings {
                                    for binding in bindings {
                                        let host_port = binding.host_port.unwrap_or_default();

                                        self.caddy_api
                                            .register(
                                                &subdomain,
                                                &host_port,
                                                &container.name,
                                                &container_port,
                                            )
                                            .await?;

                                        port_mappings.insert(
                                            format!("{}_{}", container.name, container_port),
                                            host_port,
                                        );
                                    }
                                }
                            }
                        }
                    }
                }

                crate::db::instance::create(
                    CreateInstanceSchema {
                        container_id: container_info.id,
                        deployment_id: deployment_model.id,
                        container_name: container.name.clone(),
                    },
                    &self.db,
                )
                .await?;

                deployed.push(container.name.clone());
            }
        }

        Ok((subdomain, port_mappings))
    }

    pub async fn cleanup_expired_deployments(&self) -> Result<()> {
        let expired_deployments = Deployment::find()
            .filter(entity::deployment::Column::Expiry.lt(Utc::now()))
            .all(&self.db)
            .await?;

        for deployment in expired_deployments {
            let instances = db::deployment::related_instances(deployment.id, &self.db)
                .await?
                .unwrap();

            for instance in instances {
                self.docker
                    .stop_container(&instance.container_id, None)
                    .await?;

                self.docker
                    .remove_container(
                        &instance.container_id,
                        Some(bollard::container::RemoveContainerOptions {
                            force: true,
                            ..Default::default()
                        }),
                    )
                    .await?;

                Instance::delete_by_id(instance.id).exec(&self.db).await?;
            }
        }

        Ok(())
    }

    pub async fn cleanup_challenge(&self, challenge_id: Uuid, player_id: Uuid) -> Result<()> {
        let Some(deployment) = Deployment::find()
            .filter(entity::deployment::Column::ChallengeId.eq(challenge_id))
            .filter(entity::deployment::Column::PlayerId.eq(player_id))
            .one(&self.db)
            .await?
        else {
            return Err(Error::NotFound("Deployment not found".to_owned()));
        };

        let instances = db::deployment::related_instances(deployment.id, &self.db)
            .await?
            .unwrap();

        for instance in instances {
            self.docker
                .stop_container(&instance.container_id, None)
                .await?;

            self.docker
                .remove_container(
                    &instance.container_id,
                    Some(bollard::container::RemoveContainerOptions {
                        force: true,
                        ..Default::default()
                    }),
                )
                .await?;

            crate::db::instance::delete(instance.id, &self.db).await?;

            self.caddy_api
                .remove(&deployment.hostname, &instance.container_name)
                .await?;
        }

        let networks = self
            .docker
            .list_networks::<String>(None)
            .await?
            .into_iter()
            .filter(|n| n.name.as_ref().is_some_and(|name| name.starts_with("ctf_")));

        for network in networks {
            if let Some(id) = network.id {
                self.docker.remove_network(&id).await?;
            }
        }

        Ok(())
    }
}
