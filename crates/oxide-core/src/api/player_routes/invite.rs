use std::sync::Arc;

use axum::routing::post;
use axum::Router;

use crate::handlers::invite;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/invite/verify", post(invite::verify))
}
