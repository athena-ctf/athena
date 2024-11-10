use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::notification;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/notifications", get(notification::player_list))
}
