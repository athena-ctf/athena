use entity::prelude::*;
use sea_orm::prelude::*;
use sea_orm::Condition;

use crate::errors::Result;

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
