use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::get;
use axum::{Json, Router};

use super::schemas::{
    CreateVolumeBody, ListVolumesQuery, PruneVolumesQuery, RemoveVolumeQuery, Volume,
    VolumePruneResponse,
};
use crate::errors::Result;
use crate::schemas::JsonResponse;
use crate::{ApiResponse, AppState};

#[oxide_macros::requires_permission(permission = "docker.volume:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/volume",
    operation_id = "docker_volume_list",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, description = "Listed docker volumes successfully", body = [Volume]),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// List all docker volumes
pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListVolumesQuery>,
) -> Result<ApiResponse<Json<Vec<Volume>>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .list_volumes(Some(query.into()))
            .await?
            .volumes
            .unwrap_or_default()
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.volume:create")]
#[utoipa::path(
    post,
    path = "/admin/docker/volume",
    operation_id = "docker_volume_create",
    request_body = CreateVolumeBody,
    responses(
        (status = 200, description = "Created docker volume successfully", body = Volume),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Create docker volumes
pub async fn create(
    state: State<Arc<AppState>>,
    Json(body): Json<CreateVolumeBody>,
) -> Result<ApiResponse<Json<Volume>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .create_volume(body.into())
            .await?
            .into(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.volume:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/volume/{name}",
    operation_id = "docker_volume_inspect",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, description = "Inspected docker volume successfully", body = Volume),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "Container not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Inspect docker volume
pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<ApiResponse<Json<Volume>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .inspect_volume(&name)
            .await?
            .into(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.volume:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/volume/{name}",
    operation_id = "docker_volume_remove",
    params(
        ("name" = String, Path),
        ("force" = bool, Query),
    ),
    responses(
        (status = 204, description = "Removed docker volume successfully"),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Removed docker volume
pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveVolumeQuery>,
) -> Result<ApiResponse<()>> {
    state
        .docker_manager
        .conn()
        .remove_volume(&name, Some(query.into()))
        .await?;

    Ok(ApiResponse::no_content())
}

#[oxide_macros::requires_permission(permission = "docker.volume:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/volume",
    operation_id = "docker_volume_prune",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, description = "Pruned docker volumes successfully", body = VolumePruneResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Pruned docker volumes
pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneVolumesQuery>,
) -> Result<ApiResponse<Json<VolumePruneResponse>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .prune_volumes(Some(query.into()))
            .await?
            .into(),
    ))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/volume", get(list).post(create).delete(prune))
        .route("/volume/:name", get(inspect).delete(remove))
}
