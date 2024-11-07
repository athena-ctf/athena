use argon2::{Argon2, PasswordHash, PasswordVerifier};
use entity::prelude::*;
use sea_orm::prelude::*;
use sea_orm::DatabaseTransaction;

use crate::errors::Result;

pub async fn verify(
    username: String,
    password: String,
    db: &DatabaseTransaction,
) -> Result<Option<AdminModel>> {
    let Some((user_model, admin_model)) = User::find()
        .find_also_related(Admin)
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

    Ok(admin_model)
}
