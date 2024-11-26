use std::sync::Arc;
use std::time::Duration;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::State;
use axum::Json;
use axum_extra::extract::cookie::Cookie;
use axum_extra::extract::CookieJar;
use fred::prelude::*;
use jsonwebtoken::{DecodingKey, Validation};
use sea_orm::prelude::*;
use sea_orm::TransactionTrait;

use crate::errors::{Error, Result};
use crate::jwt::{RefreshClaims, TokenPair};
use crate::redis_keys::REFRESH_TOKEN_BLACKLIST;
use crate::schemas::{Admin, AdminModel, JsonResponse, LoginRequest, LoginResponse};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/token",
    request_body = LoginRequest,
    operation_id = "admin_token",
    responses(
        (status = 200, description = "user logged in successfully", body = LoginResponse<AdminModel>),
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
    operation_id = "admin_token_refresh",
    responses(
        (status = 200, description = "user logged in successfully", body = JsonResponse),
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
) -> Result<(CookieJar, Json<JsonResponse>)> {
    let Some(refresh_token) = jar.get("refresh_token") else {
        return Err(Error::Unauthorized(
            None,
            "No refresh token found".to_owned(),
        ));
    };

    let refresh_claims = jsonwebtoken::decode::<RefreshClaims>(
        refresh_token.value(),
        &DecodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
        &Validation::new(jsonwebtoken::Algorithm::HS256),
    )?
    .claims;

    let is_blacklisted = state
        .persistent_client
        .hexists::<u8, _, _>(
            REFRESH_TOKEN_BLACKLIST,
            refresh_claims.jti.to_string(),
        )
        .await?;

    if is_blacklisted == 0 {
        return Err(Error::Unauthorized(
            Some(jar.remove("refresh_token")),
            "Blacklisted refresh_token used".to_owned(),
        ));
    }

    state
        .persistent_client
        .hset::<(), _, _>(
            REFRESH_TOKEN_BLACKLIST,
            (refresh_claims.jti.to_string(), 0),
        )
        .await?;

    state
        .persistent_client
        .hexpire::<(), _, _>(
            REFRESH_TOKEN_BLACKLIST,
            state
                .settings
                .read()
                .await
                .jwt
                .refresh_expiry_duration
                .try_into()
                .unwrap(),
            None,
            refresh_claims.jti.to_string(),
        )
        .await?;

    let Some(admin_model) = Admin::find_by_id(refresh_claims.sub)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::Unauthorized(
            Some(jar.remove("refresh_token")),
            "Invalid refresh_token".to_owned(),
        ));
    };

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

    Ok((
        jar.add(cookie),
        Json(JsonResponse {
            message: access_token,
        }),
    ))
}
