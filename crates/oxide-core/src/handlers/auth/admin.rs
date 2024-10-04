use std::sync::Arc;

use axum::extract::State;
use axum::{Extension, Json};
use entity::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};

use crate::db;
use crate::db::admin;
use crate::errors::{Error, Result};
use crate::schemas::{LoginModel, TokenClaims, TokenPair};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/login",
    request_body = LoginModel,
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
    security(())
)]
/// Create auth token
pub async fn login(
    state: State<Arc<AppState>>,
    Json(body): Json<LoginModel>,
) -> Result<Json<TokenPair>> {
    let settings = state.settings.read().await;
    let Some(admin_model) = db::admin::verify(body.username, body.password, &state.db_conn).await?
    else {
        return Err(Error::BadRequest("Username invalid".to_owned()));
    };

    let token_pair = crate::service::generate_admin_token_pair(&admin_model, &settings.jwt)?;
    Ok(Json(token_pair))
}

#[utoipa::path(
    post,
    path = "/auth/admin/token/refresh",
    request_body = TokenPair,
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Refresh auth token
pub async fn refresh_token(
    state: State<Arc<AppState>>,
    Json(body): Json<TokenPair>,
) -> Result<Json<TokenPair>> {
    let claims = jsonwebtoken::decode::<TokenClaims>(
        &body.refresh_token,
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
        &Validation::default(),
    )?
    .claims;

    let Some(admin_model) = db::admin::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("User does not exist".to_owned()));
    };

    let token_pair =
        crate::service::generate_admin_token_pair(&admin_model, &state.settings.read().await.jwt)?;

    Ok(Json(token_pair))
}

#[utoipa::path(
    get,
    path = "/auth/admin/profile",
    responses(
        (status = 200, description = "Password reset email sent successful", body = Account),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 404, description = "User not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    ),
)]
/// Return currently authenticated user
pub async fn get_profile(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<AdminModel>> {
    db::admin::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    .map_or_else(
        || Err(Error::NotFound("User does not exist".to_owned())),
        |user_model| Ok(Json(user_model)),
    )
}
