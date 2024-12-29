use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::AppState;
use crate::handlers::instance;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/instance/restart/:id", get(instance::restart))
}
