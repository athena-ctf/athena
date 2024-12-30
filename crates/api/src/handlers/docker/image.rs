use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::{get, patch};
use axum::{Json, Router};
use axum_typed_multipart::TypedMultipart;
use bytes::Bytes;
use futures::StreamExt;

use super::schemas::{
    BuildImageBody, HistoryResponseItem, ImageDeleteResponseItem, ImageInspect, ImagePruneResponse,
    ImageSearchResponseItem, ImageSummary, ListImagesQuery, PruneImagesQuery, RemoveImageQuery, SearchImageQuery,
    TagImageBody,
};
use crate::errors::Result;
use crate::schemas::JsonResponse;
use crate::{ApiResponse, AppState};

#[api_macros::requires_permission(permission = "docker.image:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/image",
    operation_id = "docker_image_list",
    params(
        ("all" = bool, Query),
        ("digests" = bool, Query),
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = [ImageSummary]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListImagesQuery>,
) -> Result<ApiResponse<Json<Vec<ImageSummary>>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .list_images(Some(query.into()))
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/image",
    operation_id = "docker_image_prune",
    params(
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = ImagePruneResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneImagesQuery>,
) -> Result<ApiResponse<Json<ImagePruneResponse>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .prune_images(Some(query.into()))
            .await?
            .into(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:delete")]
#[utoipa::path(
    delete,
    path = "/admin/docker/image/{name}",
    operation_id = "docker_image_remove",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveImageQuery>,
) -> Result<ApiResponse<Json<Vec<ImageDeleteResponseItem>>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .remove_image(&name, Some(query.into()), None)
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/image/{name}",
    operation_id = "docker_image_inspect",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = ImageInspect),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn inspect(state: State<Arc<AppState>>, Path(name): Path<String>) -> Result<ApiResponse<Json<ImageInspect>>> {
    Ok(ApiResponse::json_ok(
        state.docker_manager.conn().inspect_image(&name).await?.into(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/image/{name}/history",
    operation_id = "docker_image_history",
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = [HistoryResponseItem]),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn history(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<ApiResponse<Json<Vec<HistoryResponseItem>>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .image_history(&name)
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:update")]
#[utoipa::path(
    patch,
    path = "/admin/docker/image/{name}/tag",
    operation_id = "docker_image_tag",
    request_body = TagImageBody,
    params(
        ("name" = String, Path),
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn tag(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<TagImageBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state.docker_manager.conn().tag_image(&name, Some(body.into())).await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "Successfully added tag to image".to_owned(),
    }))
}

#[api_macros::requires_permission(permission = "docker.image:read")]
#[utoipa::path(
    get,
    path = "/admin/docker/image/search",
    operation_id = "docker_image_search",
    params(
        ("term" = String, Query),
        ("limit" = Option<i64>, Query),
        ("filters" = HashMap<String, Vec<String>>, Query),
    ),
    responses(
        (status = 200, body = [ImageSearchResponseItem]),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn search(
    state: State<Arc<AppState>>,
    Query(query): Query<SearchImageQuery>,
) -> Result<ApiResponse<Json<Vec<ImageSearchResponseItem>>>> {
    Ok(ApiResponse::json_ok(
        state
            .docker_manager
            .conn()
            .search_images(query.into())
            .await?
            .into_iter()
            .map(Into::into)
            .collect(),
    ))
}

#[api_macros::requires_permission(permission = "docker.image:create")]
#[utoipa::path(
    post,
    path = "/admin/docker/image",
    operation_id = "docker_image_create",
    request_body(
        content = BuildImageBody,
        content_type = "multipart/form-data",
    ),
    responses(
        (status = 201, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn create(
    state: State<Arc<AppState>>,
    TypedMultipart(body): TypedMultipart<BuildImageBody>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    tokio::spawn(async move {
        let mut build_stream = state.docker_manager.conn().build_image(
            body.to_build_options(),
            None,
            Some(Bytes::copy_from_slice(&body.file)),
        );

        while build_stream.next().await.is_some() {}

        let mut push_stream =
            state
                .docker_manager
                .conn()
                .push_image(&body.image_name, Some(body.to_push_options()), None);

        while push_stream.next().await.is_some() {}
    });

    Ok(ApiResponse::json_created(JsonResponse {
        message: "Successfully started image creation".to_owned(),
    }))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/image", get(list).post(create).delete(prune))
        .route("/image/search", get(search))
        .route("/image/:name", get(inspect).delete(remove))
        .route("/image/:name/history", get(history))
        .route("/image/:name/tag", patch(tag))
}
