use entity::prelude::*;
use oxide_macros::{crud_interface_db, optional_relation_db};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, Condition, IntoActiveModel};

use crate::errors::Result;

crud_interface_db!(User);

optional_relation_db!(User, Admin);
optional_relation_db!(User, Player);

pub async fn exists(email: String, username: String, db: &DbConn) -> Result<bool> {
    Ok(User::find()
        .filter(
            Condition::any()
                .add(entity::user::Column::Email.eq(email))
                .add(entity::user::Column::Username.eq(username)),
        )
        .one(db)
        .await?
        .is_some())
}
