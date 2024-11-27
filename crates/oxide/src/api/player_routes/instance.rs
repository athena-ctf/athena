use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::instance;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/instance/restart/:id", get(instance::restart))
}
