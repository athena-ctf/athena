use sea_orm::prelude::*;
use sea_orm::ActiveValue::Set;

use crate::entity::prelude::*;
use crate::entity::token;
use crate::errors::Result;

pub async fn create(email: String, context: TokenContextEnum, db: &DbConn) -> Result<String> {
    let token = std::iter::repeat_with(|| fastrand::digit(10))
        .take(8)
        .collect::<String>();

    Token::insert(token::ActiveModel {
        context: Set(context),
        value: Set(token.clone()),
        email: Set(email),
    })
    .exec(db)
    .await?;

    Ok(token)
}

pub async fn verify(
    token: String,
    email: String,
    context: TokenContextEnum,
    db: &DbConn,
) -> Result<bool> {
    Ok(Token::delete(token::ActiveModel {
        context: Set(context),
        value: Set(token),
        email: Set(email),
    })
    .exec(db)
    .await?
    .rows_affected
        == 0)
}
