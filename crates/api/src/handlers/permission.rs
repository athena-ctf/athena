use std::sync::Arc;

use axum::extract::{Path, State};
use axum::routing::{delete, post};
use axum::{Json, Router};
use uuid::Uuid;

use crate::errors::Result;
use crate::schemas::{JsonResponse, OverrideSchema, RoleSchema};
use crate::{ApiResponse, AppState};

#[api_macros::requires_permission(permission = "permission.role:add")]
#[utoipa::path(
    post,
    path = "/admin/permission/role",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn add_role_permissions(
    state: State<Arc<AppState>>,
    Json(body): Json<RoleSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .permission_manager
        .add_role_permissions(body.role, body.permissions)
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully added role".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "permission.override:add")]
#[utoipa::path(
    post,
    path = "/admin/permission/override",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn add_override_permission(
    state: State<Arc<AppState>>,
    Json(body): Json<OverrideSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .permission_manager
        .add_override_permission(body.id, body.permission)
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully added override permission".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "permission.role:update")]
#[utoipa::path(
    patch,
    path = "/admin/permission/role",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn remove_role_permissions(
    state: State<Arc<AppState>>,
    Json(body): Json<RoleSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .permission_manager
        .remove_role_permissions(body.role, body.permissions)
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully removed role permissions".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "permission.override:update")]
#[utoipa::path(
    patch,
    path = "/admin/permission/override",
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn remove_override_permission(
    state: State<Arc<AppState>>,
    Json(body): Json<OverrideSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .permission_manager
        .remove_override_permission(body.id, body.permission)
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully removed override permission".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "permission.role:delete")]
#[utoipa::path(
    delete,
    path = "/admin/permission/role/{name}",
    params(
        ("name" = String, Path)
    ),
    responses(
        (status = 204),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn remove_role(state: State<Arc<AppState>>, Path(role): Path<String>) -> Result<ApiResponse<()>> {
    state.permission_manager.remove_role(role).await?;

    Ok(ApiResponse::no_content())
}

#[api_macros::requires_permission(permission = "permission.override:delete")]
#[utoipa::path(
    delete,
    path = "/admin/permission/override/{id}",
    params(
        ("id" = Uuid, Path)
    ),
    responses(
        (status = 204),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn remove_override(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> Result<ApiResponse<()>> {
    state.permission_manager.remove_override(id).await?;

    Ok(ApiResponse::no_content())
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/permission",
        Router::new()
            .route("/role", post(add_role_permissions).patch(remove_role_permissions))
            .route("/role/:name", delete(remove_role))
            .route(
                "/override",
                post(add_override_permission).patch(remove_override_permission),
            )
            .route("/override/:id", delete(remove_override)),
    )
}
