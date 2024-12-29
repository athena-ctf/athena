use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::{get, post};
use axum::{Json, Router};

use super::schemas::{
    ConnectNetworkBody, CreateNetworkBody, CreateNetworkResponse, DisconnectNetworkBody, InspectNetworkQuery,
    ListNetworksQuery, Network, NetworkPruneResponse, PruneNetworksQuery,
};
use crate::errors::Result;
use crate::schemas::JsonResponse;
use crate::{ApiResponse, AppState};

#[api_macros::requires_permission(permission = "docker.network:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/network",
    operation_id = "docker_network_list",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = [Network]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
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

#[api_macros::requires_permission(permission = "docker.network:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/network",
    operation_id = "docker_network_prune",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = NetworkPruneResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
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

#[api_macros::requires_permission(permission = "docker.network:create")]
#[utoipa::path(
    post,
    path = "/admin/docker/network",
    operation_id = "docker_network_create",
    request_body = CreateNetworkBody,
    responses(
        (status = 201, body = CreateNetworkResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn create(
    state: State<Arc<AppState>>,
    Json(network): Json<CreateNetworkBody>,
) -> Result<ApiResponse<Json<CreateNetworkResponse>>> {
    Ok(ApiResponse::json_created(
        state.docker_manager.conn().create_network(network.into()).await?.into(),
    ))
}

#[api_macros::requires_permission(permission = "docker.network:read")]
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
        (status = 200, body = Network),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
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

#[api_macros::requires_permission(permission = "docker.network:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/network/{name}",
    operation_id = "docker_network_remove",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 204),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn remove(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<()>> {
    state.docker_manager.conn().remove_network(&name).await?;

    Ok(ApiResponse::no_content())
}

#[api_macros::requires_permission(permission = "docker.network:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/network/{name}/connect",
    operation_id = "docker_network_connect",
    params(
        ("name" = String, Path),
    ),
    request_body = ConnectNetworkBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn connect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<ConnectNetworkBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.docker_manager.conn().connect_network(&name, body.into()).await?;

    Ok(ApiResponse::json(JsonResponse {
        message: "Successfully connected network".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "docker.network:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/network/{name}/disconnect",
    operation_id = "docker_network_disconnect",
    params(
        ("name" = String, Path),
    ),
    request_body = DisconnectNetworkBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
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
