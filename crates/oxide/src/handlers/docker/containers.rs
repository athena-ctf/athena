use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::routing::{get, post};
use axum::{Json, Router};
use futures::{Stream, StreamExt};

use super::schemas::{
    ContainerInspectResponse, ContainerPruneResponse, ContainerSummary, ContainerTopResponse,
    CreateContainerBody, CreateContainerResponse, FilesystemChange, InspectContainerQuery,
    KillContainerQuery, ListContainersQuery, LogOutput, PruneContainersQuery, RemoveContainerQuery,
    RestartContainerQuery, StartContainerQuery, Stats, StopContainerQuery,
};
use crate::app_state::AppState;
use crate::errors::Result;

pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListContainersQuery>,
) -> Result<Json<Vec<ContainerSummary>>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .list_containers(Some(query.into()))
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

pub async fn create(
    state: State<Arc<AppState>>,
    Json(container): Json<CreateContainerBody>,
) -> Result<Json<CreateContainerResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .create_container(
                Some(container.options.into()),
                Into::<bollard::models::ContainerConfig>::into(container.config).into(),
            )
            .await?
            .into(),
    ))
}

pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<InspectContainerQuery>,
) -> Result<Json<ContainerInspectResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .inspect_container(&name, Some(query.into()))
            .await?
            .into(),
    ))
}

pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveContainerQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .remove_container(&name, Some(query.into()))
        .await?)
}

pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneContainersQuery>,
) -> Result<Json<ContainerPruneResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .prune_containers(Some(query.into()))
            .await?
            .into(),
    ))
}

pub async fn kill(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<KillContainerQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .kill_container(&name, Some(query.into()))
        .await?)
}

pub async fn stop(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<StopContainerQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .stop_container(&name, Some(query.into()))
        .await?)
}

pub async fn changes(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<Vec<FilesystemChange>>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .container_changes(&name)
            .await?
            .unwrap_or_default()
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

pub async fn pause(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<()> {
    Ok(state.docker_manager.conn().pause_container(&name).await?)
}

pub async fn unpause(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<()> {
    Ok(state.docker_manager.conn().unpause_container(&name).await?)
}

pub async fn start(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<StartContainerQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .start_container(&name, Some(query.into()))
        .await?)
}

pub async fn restart(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RestartContainerQuery>,
) -> Result<()> {
    Ok(state
        .docker_manager
        .conn()
        .restart_container(&name, Some(query.into()))
        .await?)
}

pub async fn export(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<Body> {
    Ok(Body::from_stream(
        state.docker_manager.conn().export_container(&name),
    ))
}

pub async fn top(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<ContainerTopResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .top_processes(
                &name,
                Some(bollard::container::TopOptions { ps_args: "aux" }),
            )
            .await?
            .into(),
    ))
}

pub async fn logs(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<Vec<LogOutput>>> {
    let mut log_stream = state.docker_manager.conn().logs(
        &name,
        Some(bollard::container::LogsOptions {
            stdout: true,
            stderr: true,
            follow: false,
            timestamps: false,
            tail: "all",
            ..Default::default()
        }),
    );

    let mut logs = Vec::with_capacity(log_stream.size_hint().0);
    while let Some(log) = log_stream.next().await {
        let log = log?;
        logs.push(log.into());
    }

    Ok(Json(logs))
}

pub async fn stats(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<Json<Stats>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .stats(
                &name,
                Some(bollard::container::StatsOptions {
                    stream: false,
                    one_shot: true,
                }),
            )
            .next()
            .await
            .unwrap()?
            .into(),
    ))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/container", get(list).post(create).delete(prune))
        .route("/container/:name", get(inspect).delete(remove))
        .route("/container/:name/kill", post(kill))
        .route("/container/:name/stop", post(stop))
        .route("/container/:name/changes", get(changes))
        .route("/container/:name/pause", post(pause))
        .route("/container/:name/unpause", post(unpause))
        .route("/container/:name/start", post(start))
        .route("/container/:name/restart", post(restart))
        .route("/container/:name/export", get(export))
        .route("/container/:name/stats", get(stats))
        .route("/container/:name/logs", get(logs))
        .route("/container/:name/top", get(top))
}

// TODO: add exec
