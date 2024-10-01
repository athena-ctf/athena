use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use oxide_macros::{crud_interface_db, multiple_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;

crud_interface_db!(Tag);

multiple_relation_db!(Tag, Challenge);

pub async fn retrieve_by_value(value: &str, db: &DbConn) -> Result<Option<TagModel>> {
    Ok(Tag::find()
        .filter(entity::tag::Column::Value.eq(value))
        .one(db)
        .await?)
}
