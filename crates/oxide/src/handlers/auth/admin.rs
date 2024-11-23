use std::sync::Arc;
use std::time::Duration;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::State;
use axum::Json;
use axum_extra::extract::cookie::Cookie;
use axum_extra::extract::CookieJar;
use sea_orm::prelude::*;
use sea_orm::TransactionTrait;

use crate::errors::{Error, Result};
use crate::jwt::TokenPair;
use crate::schemas::{Admin, AdminModel, JsonResponse, LoginRequest, LoginResponse};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/token",
    request_body = LoginRequest,
    operation_id = "admin_token",
    responses(
        (status = 200, description = "user logged in successfully", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Get admin access token
pub async fn token(
    state: State<Arc<AppState>>,
    jar: CookieJar,
    Json(body): Json<LoginRequest>,
) -> Result<(CookieJar, Json<LoginResponse<AdminModel>>)> {
    let txn = state.db_conn.begin().await?;

    let Some(admin_model) = Admin::find()
        .filter(entity::admin::Column::Username.eq(&body.username))
        .one(&txn)
        .await?
    else {
        return Err(Error::NotFound("No admin with username exists".to_owned()));
    };

    if Argon2::default()
        .verify_password(
            body.password.as_bytes(),
            &PasswordHash::new(&admin_model.password)?,
        )
        .is_err()
    {
        return Err(Error::BadRequest("Invalid password".to_owned()));
    }

    let TokenPair(access_token, refresh_token) = TokenPair::new_admin(
        &state.settings.read().await.jwt,
        admin_model.id,
        admin_model.role,
    )?;

    let cookie = Cookie::build(("refresh_token", refresh_token))
        .secure(true)
        .http_only(true)
        .max_age(
            Duration::from_secs(state.settings.read().await.jwt.refresh_expiry_duration)
                .try_into()
                .unwrap(),
        );

    txn.commit().await?;

    Ok((
        jar.add(cookie),
        Json(LoginResponse {
            model: admin_model,
            access_token,
        }),
    ))
}

#[utoipa::path(
    post,
    path = "/auth/admin/token/refresh",
    request_body = LoginRequest,
    operation_id = "admin_token_refresh",
    responses(
        (status = 200, description = "user logged in successfully", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Refresh admin token
pub async fn token_refresh(
    state: State<Arc<AppState>>,
    jar: CookieJar,
    Json(body): Json<LoginRequest>,
) -> Result<(CookieJar, Json<LoginResponse<AdminModel>>)> {
    let txn = state.db_conn.begin().await?;

    let Some(admin_model) = Admin::find()
        .filter(entity::admin::Column::Username.eq(&body.username))
        .one(&txn)
        .await?
    else {
        return Err(Error::NotFound("No admin with username exists".to_owned()));
    };

    if Argon2::default()
        .verify_password(
            body.password.as_bytes(),
            &PasswordHash::new(&admin_model.password)?,
        )
        .is_err()
    {
        return Err(Error::BadRequest("Invalid password".to_owned()));
    }

    let TokenPair(access_token, refresh_token) = TokenPair::new_admin(
        &state.settings.read().await.jwt,
        admin_model.id,
        admin_model.role,
    )?;

    let cookie = Cookie::build(("refresh_token", refresh_token))
        .secure(true)
        .http_only(true)
        .max_age(
            Duration::from_secs(state.settings.read().await.jwt.refresh_expiry_duration)
                .try_into()
                .unwrap(),
        );

    txn.commit().await?;

    Ok((
        jar.add(cookie),
        Json(LoginResponse {
            model: admin_model,
            access_token,
        }),
    ))
}
