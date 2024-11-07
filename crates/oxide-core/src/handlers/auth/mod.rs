pub mod admin;
pub mod player;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use entity::prelude::*;
use sea_orm::prelude::*;

use crate::errors::Result;

pub async fn verify<C: ConnectionTrait>(
    username: String,
    password: String,
    db: &C,
) -> Result<Option<UserModel>> {
    let Some(user_model) = User::find()
        .filter(entity::user::Column::Username.eq(username))
        .one(db)
        .await?
    else {
        return Ok(None);
    };

    Argon2::default().verify_password(
        password.as_bytes(),
        &PasswordHash::new(&user_model.password)?,
    )?;

    Ok(Some(user_model))
}
