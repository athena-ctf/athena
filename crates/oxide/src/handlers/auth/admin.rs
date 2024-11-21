use std::sync::Arc;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::State;
use axum::Json;
use axum_extra::extract::cookie::Cookie;
use axum_extra::extract::CookieJar;
use jsonwebtoken::{EncodingKey, Header};
use sea_orm::prelude::*;
use sea_orm::TransactionTrait;

use crate::errors::{Error, Result};
use crate::schemas::{Admin, AdminClaims, AdminModel, JsonResponse, LoginRequest, LoginResponse};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/login",
    request_body = LoginRequest,
    operation_id = "admin_login",
    responses(
        (status = 200, description = "user logged in successfully", body = AdminModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
    security(())
)]
/// Login admin
pub async fn login(
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

    let now = chrono::Utc::now();

    let access_token = jsonwebtoken::encode(
        &Header::new(jsonwebtoken::Algorithm::HS256),
        &AdminClaims {
            exp: now.timestamp(),
            iat: (now + chrono::Duration::minutes(15)).timestamp(), // TODO: read from config
            sub: admin_model.id,
            role: admin_model.role,
        },
        &EncodingKey::from_base64_secret(&state.settings.read().await.jwt.secret)?,
    )?;

    // TODO: add refresh token to cookie jar

    let cookie = Cookie::build(("refresh_token", ""))
        .secure(true)
        .http_only(true)
        .max_age(time::Duration::days(1));

    txn.commit().await?;

    Ok((
        jar.add(cookie),
        Json(LoginResponse {
            model: admin_model,
            access_token,
        }),
    ))
}
