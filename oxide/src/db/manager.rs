use argon2::{Argon2, PasswordHash, PasswordVerifier};
use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use sea_orm::prelude::*;
use uuid::Uuid;

use super::CachedValue;
use crate::entity::manager;
use crate::entity::prelude::*;
use crate::errors::Result;
use crate::macros::db::retrieve;

retrieve!(Manager);

pub async fn verify(
    username: String,
    password: String,
    db: &DbConn,
) -> Result<Option<ManagerModel>> {
    let Some(manager) = Manager::find()
        .filter(manager::Column::Username.eq(username))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Argon2::default()
        .verify_password(password.as_bytes(), &PasswordHash::new(&manager.password)?)?;

    Ok(Some(manager))
}
