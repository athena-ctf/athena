use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Admin, AdminModel, AuthAdmin, CreateAdminSchema, JsonResponse, Ticket, TicketModel, User,
    UserModel,
};
use crate::service::{AppState, CachedJson};

oxide_macros::derive::crud!(Admin, single: [User], optional: [], multiple: [Ticket]);

#[utoipa::path(
    get,
    path = "/admin/current",
    operation_id = "admin_get_current",
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
