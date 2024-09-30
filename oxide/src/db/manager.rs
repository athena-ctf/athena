use argon2::{Argon2, PasswordHash, PasswordVerifier};
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

crud_interface!(Manager);

multiple_relation_with_id!(Manager, Ticket);

pub async fn verify(
    username: String,
    password: String,
    db: &DbConn,
) -> Result<Option<ManagerModel>> {
    let Some(manager) = Manager::find()
        .filter(entity::manager::Column::Username.eq(username))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Argon2::default()
        .verify_password(password.as_bytes(), &PasswordHash::new(&manager.password)?)?;

    Ok(Some(manager))
}
