use std::sync::Arc;

use axum::routing::{get, post};

use super::router_wrapper::Router;
use crate::handlers::file;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/file", get(file::list).post(file::create))
        .route(
            "/file/:id",
            get(file::retrieve_by_id)
                .delete(file::delete_by_id)
                .patch(file::update_by_id),
        )
        .route("/file/:id/download", get(file::download_by_id))
        .route("/file/:id/challenge", get(file::retrieve_challenge_by_id))
        .route("/file/upload", post(file::upload))
}
