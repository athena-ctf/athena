use std::sync::Arc;

use axum::extract::State;
use axum::{Extension, Json};
use jsonwebtoken::{DecodingKey, Validation};
use sea_orm::{EntityTrait, TransactionTrait};

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{Admin, AdminModel, JsonResponse, LoginModel, TokenClaims, TokenPair};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/login",
    request_body = LoginModel,
    operation_id = "admin_login",
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Create auth token
pub async fn login(
    state: State<Arc<AppState>>,
    Json(body): Json<LoginModel>,
) -> Result<Json<TokenPair>> {
    let txn = state.db_conn.begin().await?;
    let Some(admin_model) = db::admin::verify(body.username, body.password, &txn).await? else {
        return Err(Error::BadRequest("Username invalid".to_owned()));
    };

    let token_pair =
        crate::service::generate_admin_token_pair(&admin_model, &state.settings.read().await.jwt)?;

    txn.commit().await?;

    Ok(Json(token_pair))
}

#[utoipa::path(
    post,
    path = "/auth/admin/token/refresh",
    request_body = TokenPair,
    operation_id = "admin_refresh_token",
    responses(
        (status = 200, description = "user logged in successfully", body = TokenPair),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
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

    let Some(admin_model) = Admin::find_by_id(claims.id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("User does not exist".to_owned()));
    };

    let token_pair =
        crate::service::generate_admin_token_pair(&admin_model, &state.settings.read().await.jwt)?;

    Ok(Json(token_pair))
}

#[utoipa::path(
    get,
    path = "/auth/admin/current",
    operation_id = "admin_get_current_logged_in",
    responses(
        (status = 200, description = "Password reset email sent successful", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Return currently authenticated user
pub async fn get_current_logged_in(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<AdminModel>> {
    Admin::find_by_id(claims.id)
        .one(&state.db_conn)
        .await?
        .map_or_else(
            || Err(Error::NotFound("User does not exist".to_owned())),
            |user_model| Ok(Json(user_model)),
        )
}
