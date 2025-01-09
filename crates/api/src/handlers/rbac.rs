use std::sync::Arc;

use axum::extract::{Path, State};
use axum::routing::{delete, get};
use axum::{Json, Router};
use uuid::Uuid;

use crate::errors::Result;
use crate::schemas::{
    JsonResponse, OverrideModel, RbacUpdateAction, RoleModel, UpdateOverrideSchema, UpdateRoleSchema,
};
use crate::{ApiResponse, AppState};

#[api_macros::rbac("rbac.role:read")]
#[utoipa::path(
    get,
    path = "/admin/rbac/role",
    responses(
        (status = 201, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn list_roles(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<RoleModel>>>> {
    Ok(ApiResponse::json_ok(
        state
            .rbac_manager
            .list_roles()
            .await?
            .into_iter()
            .map(|(role, permissions)| RoleModel { role, permissions })
            .collect(),
    ))
}

#[api_macros::rbac("rbac.override:read")]
#[utoipa::path(
    get,
    path = "/admin/rbac/override",
    responses(
        (status = 201, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn list_overrides(state: State<Arc<AppState>>) -> Result<ApiResponse<Json<Vec<OverrideModel>>>> {
    Ok(ApiResponse::json_ok(
        state
            .rbac_manager
            .list_overrides()
            .await?
            .into_iter()
            .map(|(id, permissions)| OverrideModel { id, permissions })
            .collect(),
    ))
}

#[api_macros::rbac("rbac.role:create")]
#[utoipa::path(
    post,
    path = "/admin/rbac/role",
    request_body = RoleModel,
    responses(
        (status = 201, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn create_role(
    state: State<Arc<AppState>>,
    Json(body): Json<RoleModel>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.rbac_manager.create_role(body.role.clone()).await?;
    state
        .rbac_manager
        .add_role_permissions(body.role, body.permissions)
        .await?;

    Ok(ApiResponse::json_created(JsonResponse {
        message: "Successfully created role".to_owned(),
    }))
}

#[api_macros::rbac("rbac.override:create")]
#[utoipa::path(
    post,
    path = "/admin/rbac/override",
    request_body = OverrideModel,
    responses(
        (status = 201, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn create_override(
    state: State<Arc<AppState>>,
    Json(body): Json<OverrideModel>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.rbac_manager.create_override(body.id).await?;
    state
        .rbac_manager
        .add_override_permissions(body.id, body.permissions)
        .await?;

    Ok(ApiResponse::json_created(JsonResponse {
        message: "Successfully created override".to_owned(),
    }))
}

#[api_macros::rbac("rbac.role:update")]
#[utoipa::path(
    patch,
    path = "/admin/rbac/role/{role}",
    params(
        ("role" = String, Path),
    ),
    request_body = UpdateRoleSchema,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update_role(
    state: State<Arc<AppState>>,
    Path(role): Path<String>,
    Json(body): Json<UpdateRoleSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    match body.action {
        RbacUpdateAction::Add => state.rbac_manager.add_role_permissions(role, body.permissions).await?,
        RbacUpdateAction::Remove => {
            state
                .rbac_manager
                .remove_role_permissions(role, body.permissions)
                .await?
        }
    }

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully updated role".to_owned(),
    }))
}

#[api_macros::rbac("rbac.override:update")]
#[utoipa::path(
    patch,
    path = "/admin/rbac/override/{override}",
    params(
        ("override" = Uuid, Path),
    ),
    request_body = UpdateOverrideSchema,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update_override(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateOverrideSchema>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    match body.action {
        RbacUpdateAction::Add => {
            state
                .rbac_manager
                .add_override_permissions(id, body.permissions)
                .await?
        }
        RbacUpdateAction::Remove => {
            state
                .rbac_manager
                .remove_override_permissions(id, body.permissions)
                .await?
        }
    }

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully updated override".to_owned(),
    }))
}

#[api_macros::rbac("rbac.role:delete")]
#[utoipa::path(
    delete,
    path = "/admin/rbac/role/{name}",
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
    state.rbac_manager.remove_role(role).await?;

    Ok(ApiResponse::no_content())
}

#[api_macros::rbac("rbac.override:delete")]
#[utoipa::path(
    delete,
    path = "/admin/rbac/override/{id}",
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
    state.rbac_manager.remove_override(id).await?;

    Ok(ApiResponse::no_content())
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/permission",
        Router::new()
            .route("/role", get(list_roles).post(create_role))
            .route("/role/{name}", delete(remove_role).patch(update_role))
            .route("/override", get(list_overrides).post(create_override))
            .route("/override/{id}", delete(remove_override).patch(update_override)),
    )
}
