use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::get;
use axum::{Json, Router};

use super::schemas::{
    CreateVolumeBody, ListVolumesQuery, PruneVolumesQuery, RemoveVolumeQuery, Volume,
    VolumePruneResponse,
};
use crate::app_state::AppState;
use crate::errors::Result;

pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListVolumesQuery>,
) -> Result<Json<Vec<Volume>>> {
    Ok(Json(
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

pub async fn create(
    state: State<Arc<AppState>>,
    Json(body): Json<CreateVolumeBody>,
) -> Result<Json<Volume>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .create_volume(body.into())
            .await?
            .into(),
    ))
}

pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<Volume>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .inspect_volume(&name)
            .await?
            .into(),
    ))
}

pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveVolumeQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .remove_volume(&name, Some(query.into()))
        .await?)
}

pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneVolumesQuery>,
) -> Result<Json<VolumePruneResponse>> {
    Ok(Json(
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
