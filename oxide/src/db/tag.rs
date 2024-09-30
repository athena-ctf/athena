use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use chrono::Utc;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use super::details::prelude::*;
use super::CachedValue;
use crate::entity;
use crate::entity::prelude::*;
use crate::errors::Result;
use crate::macros::db::{crud_interface, multiple_relation_with_id};

crud_interface!(Tag);
multiple_relation_with_id!(Tag, Challenge);

pub async fn retrieve_by_value(value: &str, db: &DbConn) -> Result<Option<TagModel>> {
    Ok(Tag::find()
        .filter(entity::tag::Column::Value.eq(value))
        .one(db)
        .await?)
}
