use std::sync::Arc;

use axum::routing::get;
use super::router_wrapper::Router;

use crate::handlers::settings;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route(
        "/settings/:component",
        get(settings::get_setting).put(settings::update_setting),
    )
}
