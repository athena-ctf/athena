use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::image;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/image", get(image::list).post(image::create))
        .route("/image/:name", get(image::retrieve))
}
