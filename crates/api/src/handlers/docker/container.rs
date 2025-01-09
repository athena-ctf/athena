use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, Query, State};
use axum::http::{StatusCode, header};
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::{Json, Router};
use futures::{Stream, StreamExt};

use super::schemas::{
    ContainerInspectResponse, ContainerPruneResponse, ContainerSummary, ContainerTopResponse, CreateContainerBody,
    CreateContainerResponse, FilesystemChange, InspectContainerQuery, KillContainerBody, ListContainersQuery,
    LogOutput, PruneContainersQuery, RemoveContainerQuery, RestartContainerBody, StartContainerBody, Stats,
    StopContainerBody,
};
use crate::errors::Result;
use crate::schemas::{FileSchema, JsonResponse};
use crate::{ApiResponse, AppState};

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container",
    operation_id = "docker_container_list",
    params(
        ("all" = bool, Query),
        ("limit" = Option<isize>, Query),
        ("size" = bool, Query),
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = [ContainerSummary]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListContainersQuery>,
) -> Result<ApiResponse<Json<Vec<ContainerSummary>>>> {
    Ok(ApiResponse::json_ok(
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

#[api_macros::rbac("docker.container:create")]
#[utoipa::path(
    post,
    path = "/admin/docker/container",
    operation_id = "docker_container_create",
    request_body = CreateContainerBody,
    responses(
        (status = 201, body = CreateContainerResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn create(
    state: State<Arc<AppState>>,
    Json(container): Json<CreateContainerBody>,
) -> Result<ApiResponse<Json<CreateContainerResponse>>> {
    Ok(ApiResponse::json_created(
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

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}",
    operation_id = "docker_container_inspect",
    params(
        ("name" = String, Path),
        ("size" = bool, Query),
    ),
    responses(
        (status = 200, body = ContainerInspectResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<InspectContainerQuery>,
) -> Result<ApiResponse<Json<ContainerInspectResponse>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .inspect_container(&name, Some(query.into()))
            .await?
            .into(),
    ))
}

#[api_macros::rbac("docker.container:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/container/{name}",
    operation_id = "docker_container_remove",
    params(
        ("v" = bool, Query),
        ("force" = bool, Query),
        ("link" = bool, Query),
        ("name" = String, Path),
    ),
    responses(
        (status = 204),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveContainerQuery>,
) -> Result<ApiResponse<()>> {
    state
        .docker_manager
        .conn()
        .remove_container(&name, Some(query.into()))
        .await?;

    Ok(ApiResponse::no_content())
}

#[api_macros::rbac("docker.container:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/container",
    operation_id = "docker_container_prune",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = ContainerPruneResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneContainersQuery>,
) -> Result<ApiResponse<Json<ContainerPruneResponse>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .prune_containers(Some(query.into()))
            .await?
            .into(),
    ))
}

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/kill",
    operation_id = "docker_container_kill",
    params(
        ("name" = String, Path),
    ),
    request_body = KillContainerBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn kill(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<KillContainerBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .kill_container(&name, Some(body.into()))
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully killed container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/stop",
    operation_id = "docker_container_stop",
    params(
        ("name" = String, Path),
    ),
    request_body = StopContainerBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn stop(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<StopContainerBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .stop_container(&name, Some(body.into()))
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully stopped container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}/changes",
    operation_id = "docker_container_changes",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = [FilesystemChange]),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn changes(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<ApiResponse<Json<Vec<FilesystemChange>>>> {
    Ok(ApiResponse::json_ok(
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

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/pause",
    operation_id = "docker_container_pause",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn pause(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.docker_manager.conn().pause_container(&name).await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully paused container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/unpause",
    operation_id = "docker_container_unpause",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn unpause(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.docker_manager.conn().unpause_container(&name).await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully unpaused container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/start",
    operation_id = "docker_container_start",
    params(
        ("name" = String, Path),
    ),
    request_body = StartContainerBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn start(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<StartContainerBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .start_container(&name, Some(body.into()))
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully started container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:update")]
#[utoipa::path(
    post,
    path = "/admin/docker/container/{name}/restart",
    operation_id = "docker_container_restart",
    params(
        ("name" = String, Path),
    ),
    request_body = RestartContainerBody,
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn restart(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<RestartContainerBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .conn()
        .restart_container(&name, Some(body.into()))
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully restarted container".to_owned(),
    }))
}

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}/export",
    operation_id = "docker_container_export",
    params(
        ("name" = String, Path)
    ),
    responses(
        (status = 200, body = inline(FileSchema), content_type = "application/octet-stream"),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn export(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<impl IntoResponse>> {
    Ok(ApiResponse(
        StatusCode::OK,
        (
            [(header::CONTENT_TYPE, "application/octet-stream")],
            Body::from_stream(state.docker_manager.conn().export_container(&name)),
        ),
    ))
}

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}/top",
    operation_id = "docker_container_top",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = ContainerTopResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn top(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<ApiResponse<Json<ContainerTopResponse>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .top_processes(&name, Some(bollard::container::TopOptions { ps_args: "aux" }))
            .await?
            .into(),
    ))
}

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}/logs",
    operation_id = "docker_container_logs",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = [LogOutput]),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn logs(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<Json<Vec<LogOutput>>>> {
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

    Ok(ApiResponse::json_ok(logs))
}

#[api_macros::rbac("docker.container:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/container/{name}/stats",
    operation_id = "docker_container_stats",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = Stats),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn stats(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<Json<Stats>>> {
    Ok(ApiResponse::json_ok(
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
        .route("/container/{name}", get(inspect).delete(remove))
        .route("/container/{name}/kill", post(kill))
        .route("/container/{name}/stop", post(stop))
        .route("/container/{name}/changes", get(changes))
        .route("/container/{name}/pause", post(pause))
        .route("/container/{name}/unpause", post(unpause))
        .route("/container/{name}/start", post(start))
        .route("/container/{name}/restart", post(restart))
        .route("/container/{name}/export", get(export))
        .route("/container/{name}/stats", get(stats))
        .route("/container/{name}/logs", get(logs))
        .route("/container/{name}/top", get(top))
}
