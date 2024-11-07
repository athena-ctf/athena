use entity::prelude::*;
use sea_orm::prelude::*;

use crate::errors::Result;

pub async fn retrieve_by_value(value: &str, db: &DbConn) -> Result<Option<TagModel>> {
    Ok(Tag::find()
        .filter(entity::tag::Column::Value.eq(value))
        .one(db)
        .await?)
}
