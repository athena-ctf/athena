use std::sync::Arc;

use axum::Router;
use axum::routing::post;

use crate::handlers::flag;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/flag/verify", post(flag::verify))
}
