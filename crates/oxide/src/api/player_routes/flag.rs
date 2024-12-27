use std::sync::Arc;

use axum::Router;
use axum::routing::post;

use crate::AppState;
use crate::handlers::flag;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/flag/verify", post(flag::verify))
}
