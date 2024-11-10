use std::sync::Arc;

use axum::extract::State;
use axum::Json;
use sea_orm::prelude::*;
use sea_orm::TransactionTrait;
use tower_sessions::Session;

use crate::errors::{Error, Result};
use crate::schemas::{Admin, AdminModel, AuthAdmin, JsonResponse, LoginModel};
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
    let Some(user_model) = super::verify(body.username, body.password, &txn).await? else {
        return Err(Error::BadRequest("Username invalid".to_owned()));
    };

    let Some(admin_model) = user_model.find_related(Admin).one(&txn).await? else {
        return Err(Error::NotFound("User is not admin".to_owned()));
    };

    session.insert("admin", admin_model.clone()).await?;

    txn.commit().await?;

    Ok(Json(admin_model))
}

#[utoipa::path(
    post,
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

// TODO: move to admin
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
pub async fn get_current_logged_in(AuthAdmin(admin): AuthAdmin) -> Result<Json<AdminModel>> {
    Ok(Json(admin))
}
