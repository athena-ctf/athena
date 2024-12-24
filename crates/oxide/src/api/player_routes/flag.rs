use std::sync::Arc;

use axum::Router;
use axum::routing::post;

use crate::app_state::AppState;
use crate::handlers::flag;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/flag/verify", post(flag::verify))
}
