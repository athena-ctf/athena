pub mod register;
pub mod reset_password;
pub mod token;

use std::sync::Arc;

use axum::extract::{Json, State};
use axum::Extension;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{Account, TokenClaimKind, TokenClaims};
use crate::service::AppState;

#[utoipa::path(
    get,
    path = "/auth/me",
    responses(
        (status = 200, description = "Password reset email sent successful", body = Account),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
)]
/// Return currently authenticated user
pub async fn get_me(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<Account>> {
    (match &claims.kind {
        TokenClaimKind::Player => db::player::retrieve(
            claims.id,
            &state.db_conn,
            &mut state.redis_client.get().await.unwrap(),
        )
        .await?
        .map(Account::Player),

        TokenClaimKind::Manager(_) => db::manager::retrieve(
            claims.id,
            &state.db_conn,
            &mut state.redis_client.get().await.unwrap(),
        )
        .await?
        .map(Account::Manager),
    })
    .map_or_else(
        || Err(Error::NotFound("User does not exist".to_owned())),
        |user_model| Ok(Json(user_model)),
    )
}
