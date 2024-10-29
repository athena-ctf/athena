use argon2::{Argon2, PasswordHash, PasswordVerifier};
use entity::prelude::*;
use oxide_macros::{crud_interface_db, multiple_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};

use crate::errors::Result;

crud_interface_db!(Admin);

multiple_relation_db!(Admin, Ticket);

pub async fn verify(username: String, password: String, db: &DbConn) -> Result<Option<AdminModel>> {
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
