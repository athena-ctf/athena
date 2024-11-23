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
use sea_orm::{DbConn, IntoActiveModel, TransactionTrait};
use uuid::Uuid;

use super::caddy::CaddyApi;
use crate::errors::{Error, Result};

pub struct Manager {
    docker: Docker,
    caddy_api: CaddyApi,
    db: DbConn,
    registry: String,
    credentials: DockerCredentials,
    flag_len: usize,
    pub container_timeout: u64,
}

impl Manager {
    pub fn new(
        db: DbConn,
        challenge_settings: config::Challenge,
        caddy_api_url: String,
        base_url: String,
    ) -> Result<Self> {
        let docker = Docker::connect_with_local_defaults()?;
        let credentials = DockerCredentials {
            username: Some(challenge_settings.registry_username),
            password: Some(challenge_settings.registry_password),
            ..Default::default()
        };

        let caddy_api = CaddyApi::new(caddy_api_url, base_url);

        Ok(Self {
            docker,
            caddy_api,
            db,
            registry: challenge_settings.container_registry.clone(),
            credentials,
            flag_len: challenge_settings.player_flag_len,
            container_timeout: challenge_settings.container_timeout,
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
        challenge_id: Uuid,
        player_id: Uuid,
    ) -> Result<DeploymentModel> {
        let txn = self.db.begin().await?;

        let Some(challenge_model) = Challenge::find_by_id(challenge_id).one(&txn).await? else {
            return Err(Error::NotFound("Challenge not found".to_owned()));
        };

        if challenge_model.kind != ChallengeKindEnum::Containerized {
            return Err(Error::BadRequest(
                "Challenge cannot be instantiated".to_owned(),
            ));
        }

        let container_models = challenge_model.find_related(Container).all(&txn).await?;

        let expires_at = Utc::now().fixed_offset()
            + Duration::seconds(self.container_timeout.try_into().unwrap());
        let hostname = crate::gen_random(10);

        let txn = self.db.begin().await?;

        let deployment_model = DeploymentModel::new(expires_at, challenge_id, &hostname, player_id)
            .into_active_model()
            .insert(&txn)
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

        let flag = crate::gen_random(self.flag_len);

        FlagModel::new(&flag, challenge_id, Some(player_id), false)
            .into_active_model()
            .insert(&txn)
            .await?;

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

                let mut port_mapping = Vec::new();
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
                                format!("{hostname}.{}", ""),
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
                                                &hostname,
                                                &host_port,
                                                &container.name,
                                                &container_port,
                                            )
                                            .await?;

                                        port_mapping.push(format!("{container_port}:{host_port}"));
                                    }
                                }
                            }
                        }
                    }
                }

                InstanceModel::new(
                    container_info.id,
                    &container.name,
                    port_mapping,
                    deployment_model.id,
                )
                .into_active_model()
                .insert(&txn)
                .await?;

                deployed.push(container.name.clone());
            }
        }

        txn.commit().await?;

        Ok(deployment_model)
    }

    pub async fn cleanup_expired_deployments(&self) -> Result<()> {
        let txn = self.db.begin().await?;

        let expired_deployments = Deployment::find()
            .filter(entity::deployment::Column::ExpiresAt.lt(Utc::now()))
            .all(&txn)
            .await?;

        for deployment in expired_deployments {
            let instances = deployment.find_related(Instance).all(&txn).await?;

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

                Instance::delete_by_id(instance.id).exec(&txn).await?;
            }
        }

        txn.commit().await?;

        Ok(())
    }

    pub async fn cleanup_challenge(&self, challenge_id: Uuid, player_id: Uuid) -> Result<()> {
        let txn = self.db.begin().await?;

        let Some(deployment) = Deployment::find()
            .filter(entity::deployment::Column::ChallengeId.eq(challenge_id))
            .filter(entity::deployment::Column::PlayerId.eq(player_id))
            .one(&txn)
            .await?
        else {
            return Err(Error::NotFound("Deployment not found".to_owned()));
        };

        let instances = deployment.find_related(Instance).all(&txn).await?;
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

            Instance::delete_by_id(instance.id).exec(&txn).await?;

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

        txn.commit().await?;

        Ok(())
    }
}
