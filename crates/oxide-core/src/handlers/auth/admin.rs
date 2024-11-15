use std::sync::Arc;

use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::extract::State;
use axum::Json;
use sea_orm::prelude::*;
use sea_orm::TransactionTrait;
use tower_sessions::Session;

use crate::errors::{Error, Result};
use crate::schemas::{Admin, AdminModel, JsonResponse, LoginModel};
use crate::service::AppState;

#[utoipa::path(
    post,
    path = "/auth/admin/login",
    request_body = LoginModel,
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
    session: Session,
    Json(body): Json<LoginModel>,
) -> Result<Json<AdminModel>> {
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

    session.insert("admin", admin_model.clone()).await?;

    txn.commit().await?;

    Ok(Json(admin_model))
}

#[utoipa::path(
    get,
    path = "/auth/admin/logout",
    operation_id = "admin_logout",
    responses(
        (status = 200, description = "user logged in successfully"),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Logout admin
pub async fn logout(session: Session) -> Result<()> {
    Ok(session.delete().await?)
}
