use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::{get, post};
use axum::{Json, Router};

use super::schemas::{
    ConnectNetworkBody, CreateNetworkBody, CreateNetworkResponse, DisconnectNetworkBody,
    InspectNetworkQuery, ListNetworksQuery, Network, NetworkPruneResponse, PruneNetworksQuery,
};
use crate::app_state::AppState;
use crate::errors::Result;

pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListNetworksQuery>,
) -> Result<Json<Vec<Network>>> {
    Ok(Json(
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

pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneNetworksQuery>,
) -> Result<Json<NetworkPruneResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .prune_networks(Some(query.into()))
            .await?
            .into(),
    ))
}

pub async fn create(
    state: State<Arc<AppState>>,
    Json(network): Json<CreateNetworkBody>,
) -> Result<Json<CreateNetworkResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .create_network(network.into())
            .await?
            .into(),
    ))
}

pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<InspectNetworkQuery>,
) -> Result<Json<Network>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .inspect_network(&name, Some(query.into()))
            .await?
            .into(),
    ))
}

pub async fn remove(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<()> {
    Ok(state.docker_manager.conn().remove_network(&name).await?)
}

pub async fn connect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<ConnectNetworkBody>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .connect_network(&name, body.into())
        .await?)
}

pub async fn disconnect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<DisconnectNetworkBody>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .disconnect_network(&name, body.into())
        .await?)
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/network", get(list).post(create).delete(prune))
        .route("/network/:name", get(inspect).delete(remove))
        .route("/network/:name/connect", post(connect))
        .route("/network/:name/disconnect", post(disconnect))
}
