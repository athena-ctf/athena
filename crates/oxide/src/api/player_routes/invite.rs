use std::sync::Arc;

use axum::Router;
use axum::routing::{delete, patch, post};

use crate::app_state::AppState;
use crate::handlers::invite;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/invite/new", post(invite::new))
        .route("/invite/destroy/:value", delete(invite::destroy))
        .route("/invite/update/:value", patch(invite::update))
}
