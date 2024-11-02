use entity::prelude::*;
use oxide_macros::{crud_interface_db, single_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::{Error, Result};

crud_interface_db!(Instance);

single_relation_db!(Instance, Player);
single_relation_db!(Instance, Challenge);

// pub async fn destroy(
//     id: Uuid,
//     docker_client: &Docker,
//     db: &DbConn,
//     redis_client: RedisPool,
// ) -> Result<bool> {
//     let Some(instance_model) = Instance::find_by_id(id).one(db).await? else {
//         return Err(Error::Db(DbErr::Custom("Instance not found".to_owned())));
//     };

//     docker::delete_instance(docker_client, instance_model.container_id).await?;
//     let delete_result = Instance::delete_by_id(id).exec(db).await?;

//     redis_client
//         .del::<(), _>(format!("instance:{}", id.simple()))
//         .await?;
//     Ok(delete_result.rows_affected == 1)
// }

// pub async fn new(
//     details: CreateInstanceSchema,
//     client: &Docker,
//     db: &DbConn,
// ) -> Result<InstanceModel> {
//     let Some(challenge_model) = crate::db::challenge::retrieve(details.challenge_id, db).await?
//     else {
//         return Err(Error::NotFound("Challenge".to_owned()));
//     };

//     let Some(container_details) = challenge_model.container_meta else {
//         return Err(Error::BadRequest(
//             "Challenge instance details not configured.".to_owned(),
//         ));
//     };

//     if !container_details.single_instance {
//         return Err(Error::BadRequest(
//             "Cannot create instance for static server".to_owned(),
//         ));
//     }

//     let mut instance = details.into_active_model();
//     let instance_id = Uuid::now_v7();
//     instance.id = ActiveValue::Set(instance_id);
//     instance.created_at = instance.updated_at.clone();

//     let Some(expiry) = Utc::now().checked_add_signed(TimeDelta::minutes(15)) else {
//         return Err(Error::BadRequest(
//             "Could not add expiry timestamp".to_owned(),
//         ));
//     };

//     instance.expiry = ActiveValue::Set(expiry.naive_utc());

//     let flag = if challenge_model.flag_type == FlagTypeEnum::PerUser {
//         Uuid::new_v4().to_string()
//     } else {
//         Flag::find()
//             .filter(entity::flag::Column::ChallengeId.eq(challenge_model.id))
//             .one(db)
//             .await?
//             .ok_or_else(|| {
//                 Error::Db(sea_orm::error::DbErr::Custom(
//                     "Invalid table state".to_owned(),
//                 ))
//             })?
//             .value
//     };

//     let container_id = docker::create_instance(
//         format!("chall-{instance_id}"),
//         flag,
//         client,
//         container_details,
//     )
//     .await?;

//     instance.container_id = ActiveValue::Set(container_id);

//     Ok(instance.insert(db).await?)
// }
