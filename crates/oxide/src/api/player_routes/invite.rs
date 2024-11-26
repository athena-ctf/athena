use std::sync::Arc;

use axum::routing::{delete, patch, post};
use axum::Router;

use crate::handlers::invite;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/invite/new", post(invite::new))
        .route("/invite/destroy/:value", delete(invite::destroy))
        .route("/invite/update/:value", patch(invite::update))
}
