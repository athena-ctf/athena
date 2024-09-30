use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use bollard::Docker;
use chrono::{TimeDelta, Utc};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity::prelude::*;
use crate::errors::{AthenaError, Result};
use crate::macros::db::{crud_interface, single_relation};
use crate::{docker, entity};

crud_interface!(Instance);

single_relation!(Instance, Player);
single_relation!(Instance, Challenge);

pub async fn destroy(
    id: Uuid,
    docker_client: &Docker,
    db: &DbConn,
    redis_client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<bool> {
    let Some(instance_model) = Instance::find_by_id(id).one(db).await? else {
        return Err(AthenaError::Db(DbErr::Custom(
            "Instance not found".to_owned(),
        )));
    };

    docker::delete_instance(docker_client, instance_model.container_id).await?;
    let delete_result = Instance::delete_by_id(id).exec(db).await?;

    redis_client.del::<_, ()>(format!("instance:{id}")).await?;
    Ok(delete_result.rows_affected == 1)
}

pub async fn new(
    details: InstanceDetails,
    client: &Docker,
    db: &DbConn,
    redis_client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<InstanceModel> {
    let Some(challenge_model) =
        crate::db::challenge::retrieve(details.challenge_id, db, redis_client).await?
    else {
        return Err(AthenaError::Generic("No challenge found".to_owned()));
    };

    let Some(container_details) = challenge_model.container_meta else {
        return Err(AthenaError::Generic(
            "Challenge instance details not configured.".to_owned(),
        ));
    };

    if !container_details.single_instance {
        return Err(AthenaError::Generic(
            "Cannot create instance for static server".to_owned(),
        ));
    }

    let mut instance = details.into_active_model();
    instance.id = ActiveValue::Set(Uuid::now_v7());
    instance.date_created = ActiveValue::Set(Utc::now().naive_utc());

    let Some(expiry) = Utc::now().checked_add_signed(TimeDelta::minutes(15)) else {
        return Err(AthenaError::Generic(
            "Could not add expiry timestamp".to_owned(),
        ));
    };

    instance.expiry = ActiveValue::Set(expiry.naive_utc());

    let (port, container_id) = docker::create_instance(client, container_details).await?;

    instance.container_port = ActiveValue::Set(port.into());
    instance.container_id = ActiveValue::Set(container_id);

    Ok(instance.insert(db).await?)
}
