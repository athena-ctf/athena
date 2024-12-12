use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::handlers::notification;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/notifications", get(notification::player_list))
}
