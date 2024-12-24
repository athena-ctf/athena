use std::sync::Arc;

use axum::extract::{Path, Query, State};
use axum::routing::{get, post};
use axum::{Json, Router};
use axum_typed_multipart::TypedMultipart;
use bytes::Bytes;
use futures::StreamExt;

use super::schemas::{
    BuildImageBody, HistoryResponseItem, ImageDeleteResponseItem, ImageInspect, ImagePruneResponse,
    ImageSearchResponseItem, ImageSummary, ListImagesQuery, PruneImagesQuery, RemoveImageQuery,
    SearchImageQuery, TagImageBody,
};
use crate::app_state::AppState;
use crate::errors::Result;

pub async fn list(
    state: State<Arc<AppState>>,
    Query(query): Query<ListImagesQuery>,
) -> Result<Json<Vec<ImageSummary>>> {
    Ok(Json(
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

pub async fn prune(
    state: State<Arc<AppState>>,
    Query(query): Query<PruneImagesQuery>,
) -> Result<Json<ImagePruneResponse>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .prune_images(Some(query.into()))
            .await?
            .into(),
    ))
}

pub async fn remove(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Query(query): Query<RemoveImageQuery>,
) -> Result<Json<Vec<ImageDeleteResponseItem>>> {
    Ok(Json(
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

pub async fn inspect(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<ImageInspect>> {
    Ok(Json(
        state
            .docker_manager
            .conn()
            .inspect_image(&name)
            .await?
            .into(),
    ))
}

pub async fn history(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
) -> Result<Json<Vec<HistoryResponseItem>>> {
    Ok(Json(
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

pub async fn tag(
    state: State<Arc<AppState>>,
    Path(name): Path<String>,
    Json(body): Json<TagImageBody>,
) -> Result<()> {
    state
        .docker_manager
        .conn()
        .tag_image(&name, Some(body.into()))
        .await?;

    Ok(())
}

pub async fn search(
    state: State<Arc<AppState>>,
    Query(query): Query<SearchImageQuery>,
) -> Result<Json<Vec<ImageSearchResponseItem>>> {
    Ok(Json(
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

pub async fn create(
    state: State<Arc<AppState>>,
    TypedMultipart(body): TypedMultipart<BuildImageBody>,
) -> Result<()> {
    tokio::spawn(async move {
        let mut build_stream = state.docker_manager.conn().build_image(
            body.to_build_options(),
            None,
            Some(Bytes::copy_from_slice(&body.file)),
        );

        while build_stream.next().await.is_some() {}

        let mut push_stream = state.docker_manager.conn().push_image(
            &body.image_name,
            Some(body.to_push_options()),
            None,
        );

        while push_stream.next().await.is_some() {}
    });

    Ok(())
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/image", get(list).post(create).delete(prune))
        .route("/image/search", get(search))
        .route("/image/:name", get(inspect).delete(remove))
        .route("/image/:name/history", get(history))
        .route("/image/:name/tag", post(tag))
}
