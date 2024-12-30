use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::AppState;
use crate::handlers::file;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/file/:id/download", get(file::download))
}
