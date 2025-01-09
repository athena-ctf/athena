use std::sync::Arc;

use axum::Router;
use axum::extract::DefaultBodyLimit;
use axum::routing::{get, post};

use crate::AppState;
use crate::handlers::file;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/file/upload", post(file::player_upload))
        .layer(DefaultBodyLimit::max(crate::utils::to_mb(2)))
        .route("/file/{id}/download", get(file::player_download))
}
