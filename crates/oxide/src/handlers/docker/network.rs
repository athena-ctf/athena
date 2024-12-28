use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::{get, post};
use axum::{Json, Router};

use super::schemas::{
    ConnectNetworkBody, CreateNetworkBody, CreateNetworkResponse, DisconnectNetworkBody,
    InspectNetworkQuery, ListNetworksQuery, Network, NetworkPruneResponse, PruneNetworksQuery,
};
use crate::errors::Result;
use crate::schemas::JsonResponse;
use crate::{ApiResponse, AppState};

#[oxide_macros::requires_permission(permission = "docker.network:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/network",
    operation_id = "docker_network_list",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, description = "Listed docker networks successfully", body = [Network]),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// List all docker networks
pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListNetworksQuery>,
) -> Result<ApiResponse<Json<Vec<Network>>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .list_networks(Some(query.into()))
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.network:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/network",
    operation_id = "docker_network_prune",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, description = "Pruned docker networks successfully", body = NetworkPruneResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Pruned docker networks
pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneNetworksQuery>,
) -> Result<ApiResponse<Json<NetworkPruneResponse>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .prune_networks(Some(query.into()))
            .await?
            .into(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.network:create")]
#[utoipa::path(
    post,
    path = "/admin/docker/network",
    operation_id = "docker_network_create",
    request_body = CreateNetworkBody,
    responses(
        (status = 200, description = "Created docker network successfully", body = CreateNetworkResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Create docker network
pub async fn create(
    state: State<Arc<AppState>>,
    Json(network): Json<CreateNetworkBody>,
) -> Result<ApiResponse<Json<CreateNetworkResponse>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .create_network(network.into())
            .await?
            .into(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.network:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/network/{name}",
    operation_id = "docker_network_inspect",
    params(
        ("name" = String, Path),
        ("verbose" = bool, Query),
        ("scope" = String, Query),
    ),
    responses(
        (status = 200, description = "Inspected docker network successfully", body = Network),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "Container not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Inspect docker network
pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<InspectNetworkQuery>,
) -> Result<ApiResponse<Json<Network>>> {
    Ok(ApiResponse::json(
        state
            .docker_manager
            .conn()
            .inspect_network(&name, Some(query.into()))
            .await?
            .into(),
    ))
}

#[oxide_macros::requires_permission(permission = "docker.network:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/network/{name}",
    operation_id = "docker_network_remove",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 204, description = "Removed docker network successfully"),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Remove docker network
pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<ApiResponse<()>> {
    state.docker_manager.conn().remove_network(&name).await?;

    Ok(ApiResponse::no_content())
}

#[oxide_macros::requires_permission(permission = "docker.network:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/network/{name}/connect",
    operation_id = "docker_network_connect",
    params(
        ("name" = String, Path),
    ),
    request_body = ConnectNetworkBody,
    responses(
        (status = 200, description = "Connected docker network successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Connect docker network
pub async fn connect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<ConnectNetworkBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .connect_network(&name, body.into())
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully connected network".to_owned(),
    }))
}

#[oxide_macros::requires_permission(permission = "docker.network:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/network/{name}/disconnect",
    operation_id = "docker_network_disconnect",
    params(
        ("name" = String, Path),
    ),
    request_body = DisconnectNetworkBody,
    responses(
        (status = 200, description = "Disconnected docker network successfully", body = JsonResponse),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Disconnect docker network
pub async fn disconnect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<DisconnectNetworkBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .disconnect_network(&name, body.into())
        .await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully disconnected network".to_owned(),
    }))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/network", get(list).post(create).delete(prune))
        .route("/network/:name", get(inspect).delete(remove))
        .route("/network/:name/connect", post(connect))
        .route("/network/:name/disconnect", post(disconnect))
}
