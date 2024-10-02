pub mod achievement;
pub mod ban;
pub mod challenge;
pub mod challenge_tag;
pub mod file;
pub mod flag;
pub mod hint;
pub mod instance;
pub mod invite;
pub mod leaderboard;
pub mod manager;
pub mod notification;
pub mod player;
pub mod submission;
pub mod tag;
pub mod team;
pub mod ticket;
pub mod unlock;

use bb8_redis::redis::FromRedisValue;
use sea_orm::prelude::*;
use sea_orm::IntoActiveValue;
use serde::de::DeserializeOwned;

use crate::entity;
use crate::entity::sea_orm_active_enums::*;
use crate::errors::Result;
use crate::schemas::StatSchema;

pub async fn stats(db: &DbConn) -> Result<StatSchema> {
    Ok(StatSchema {
        achievement: entity::achievement::Entity::find().count(db).await?,
        ban: entity::ban::Entity::find().count(db).await?,
        challenge: entity::challenge::Entity::find().count(db).await?,
        file: entity::file::Entity::find().count(db).await?,
        flag: entity::flag::Entity::find().count(db).await?,
        hint: entity::hint::Entity::find().count(db).await?,
        instance: entity::instance::Entity::find().count(db).await?,
        invite: entity::invite::Entity::find().count(db).await?,
        notification: entity::notification::Entity::find().count(db).await?,
        player: entity::player::Entity::find().count(db).await?,
        submission: entity::submission::Entity::find().count(db).await?,
        tag: entity::tag::Entity::find().count(db).await?,
        team: entity::team::Entity::find().count(db).await?,
        unlocks: entity::unlock::Entity::find().count(db).await?,
    })
}

pub enum CachedValue<T> {
    Hit(T),
    Miss,
}

impl<T: DeserializeOwned> FromRedisValue for CachedValue<T> {
    fn from_redis_value(v: &bb8_redis::redis::Value) -> bb8_redis::redis::RedisResult<Self> {
        Ok(match v {
            bb8_redis::redis::Value::Nil => Self::Miss,
            bb8_redis::redis::Value::BulkString(data) => {
                let data = serde_json::from_slice::<T>(data)
                    .map_err(bb8_redis::redis::RedisError::from)?;

                Self::Hit(data)
            }
            _ => unreachable!(),
        })
    }
}

impl IntoActiveValue<Self> for BackendEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for CategoryEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for ChallengeStatusEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for DifficultyEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for FlagTypeEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for RoleEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for TicketStatusEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}
