use std::collections::HashMap;

use bollard::Docker;
use bollard::auth::DockerCredentials;
use bollard::container::{Config, CreateContainerOptions, RestartContainerOptions, StartContainerOptions};
use bollard::image::CreateImageOptions;
use bollard::models::ContainerStateStatusEnum;
use bollard::network::{ConnectNetworkOptions, CreateNetworkOptions};
use chrono::{Duration, Utc};
use entity::prelude::*;
use futures::StreamExt;
use sea_orm::prelude::*;
use sea_orm::{DbConn, IntoActiveModel, TransactionTrait};
use uuid::Uuid;

use super::caddy;
use crate::errors::{Error, Result};

pub struct Manager {
    docker: Docker,
    caddy_api: caddy::Api,
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

        let caddy_api = caddy::Api::new(caddy_api_url, base_url);

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

    pub fn conn(&self) -> &Docker {
        &self.docker
    }

    async fn ensure_image(&self, image: &str) -> Result<()> {
        let registry_image = format!("{}/{}", self.registry, image);

        let options = CreateImageOptions {
            from_image: registry_image.as_str(),
            ..Default::default()
        };

        let mut stream = self
            .docker
            .create_image(Some(options), None, Some(self.credentials.clone()));

        while let Some(result) = stream.next().await {
            result?;
        }

        Ok(())
    }

    pub async fn deploy_challenge(
        &self,
        challenge_model: &ChallengeModel,
        player_id: Option<Uuid>,
    ) -> Result<DeploymentModel> {
        let txn = self.db.begin().await?;

        match challenge_model.kind {
            ChallengeKindEnum::StaticContainerized => {
                if Deployment::find()
                    .filter(entity::deployment::Column::ChallengeId.eq(challenge_model.id))
                    .filter(entity::deployment::Column::PlayerId.is_null())
                    .one(&txn)
                    .await?
                    .is_some()
                {
                    return Err(Error::BadRequest("Challenge is already deployed".to_owned()));
                }
            }
            ChallengeKindEnum::DynamicContainerized => {
                if Deployment::find()
                    .filter(entity::deployment::Column::ChallengeId.eq(challenge_model.id))
                    .filter(entity::deployment::Column::PlayerId.eq(player_id))
                    .one(&txn)
                    .await?
                    .is_some()
                {
                    return Err(Error::BadRequest("Challenge is already deployed".to_owned()));
                }
            }
            _ => return Err(Error::BadRequest("Challenge cannot be deployed".to_owned())),
        }

        let container_models = challenge_model.find_related(Container).all(&txn).await?;

        let expires_at = Utc::now().fixed_offset() + Duration::seconds(self.container_timeout.try_into().unwrap());

        let txn = self.db.begin().await?;

        let deployment_model = DeploymentModel::new(expires_at, challenge_model.id, player_id)
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

        let flag = crate::utils::gen_random(self.flag_len);

        FlagModel::new(&flag, challenge_model.id, player_id, false)
            .into_active_model()
            .insert(&txn)
            .await?;

        let mut deployed = Vec::new();
        while deployed.len() < container_models.len() {
            for container in &container_models {
                if deployed.contains(&container.name) {
                    continue;
                }

                if !container.depends_on.iter().all(|dep| deployed.contains(dep)) {
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
                            env: Some([container.environment.clone(), vec![format!("FLAG={flag}")]].concat()),
                            exposed_ports: Some(exposed_ports),
                            cmd: Some(container.command.split(' ').map(ToString::to_string).collect()),
                            host_config: Some(bollard::models::HostConfig {
                                port_bindings: Some(port_bindings),
                                memory: Some(crate::utils::to_mb(container.memory_limit as usize) as i64),
                                ..Default::default()
                            }),
                            ..Default::default()
                        },
                    )
                    .await?;

                for network in &container.networks {
                    let network_name = format!("ctf_{}_{network}", challenge_model.title);
                    self.docker
                        .connect_network(&network_name, ConnectNetworkOptions {
                            container: container_info.id.as_str(),
                            ..Default::default()
                        })
                        .await?;
                }

                self.docker
                    .start_container(&container_info.id, None::<StartContainerOptions<String>>)
                    .await?;

                if !container.internal {
                    let details = self.docker.inspect_container(&container_info.id, None).await?;

                    if let Some(network_settings) = details.network_settings {
                        if let Some(ports) = network_settings.ports {
                            for (container_port, bindings) in ports {
                                if let Some(bindings) = bindings {
                                    for binding in bindings {
                                        let host_port = binding.host_port.unwrap_or_default();

                                        self.caddy_api
                                            .register(
                                                &base62::encode(deployment_model.id.as_u128()),
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

                InstanceModel::new(container_info.id, &container.name, port_mapping, deployment_model.id)
                    .into_active_model()
                    .insert(&txn)
                    .await?;

                deployed.push(container.name.clone());
            }
        }

        txn.commit().await?;

        Ok(deployment_model)
    }

    pub async fn cleanup_challenge(&self, challenge_id: Uuid, player_id: Option<Uuid>) -> Result<()> {
        let txn = self.db.begin().await?;

        let Some(deployment_model) = Deployment::find()
            .filter(entity::deployment::Column::ChallengeId.eq(challenge_id))
            .filter(entity::deployment::Column::PlayerId.eq(player_id))
            .one(&txn)
            .await?
        else {
            return Err(Error::NotFound("Deployment not found".to_owned()));
        };

        let instance_models = deployment_model.find_related(Instance).all(&txn).await?;
        for instance_model in instance_models {
            self.docker.stop_container(&instance_model.container_id, None).await?;

            self.docker
                .remove_container(
                    &instance_model.container_id,
                    Some(bollard::container::RemoveContainerOptions {
                        force: true,
                        ..Default::default()
                    }),
                )
                .await?;

            Instance::delete_by_id(instance_model.id).exec(&txn).await?;

            self.caddy_api
                .remove(
                    &base62::encode(deployment_model.id.as_u128()),
                    &instance_model.container_name,
                )
                .await?;

            instance_model.delete(&txn).await?;
        }

        let networks = self
            .docker
            .list_networks::<String>(None)
            .await?
            .into_iter()
            .filter(|n| n.name.as_ref().is_some_and(|name| name.starts_with("ctf_")));

        for network in networks {
            if let Some(name) = network.name {
                self.docker.remove_network(&name).await?;
            }
        }

        deployment_model.delete(&txn).await?;

        Flag::find()
            .filter(entity::flag::Column::ChallengeId.eq(challenge_id))
            .filter(entity::flag::Column::PlayerId.eq(player_id))
            .one(&txn)
            .await?
            .unwrap()
            .delete(&txn)
            .await?;

        txn.commit().await?;

        Ok(())
    }

    pub async fn get_container_status(&self, container_id: &str) -> Result<ContainerStateStatusEnum> {
        let container_details = self.docker.inspect_container(container_id, None).await?;

        container_details
            .state
            .and_then(|state| state.status)
            .ok_or(Error::BadRequest("Could not get state of container".to_owned()))
    }

    pub async fn restart_container(&self, container_id: &str) -> Result<()> {
        self.docker
            .restart_container(container_id, Some(RestartContainerOptions { t: 30 }))
            .await?;

        Ok(())
    }
}
