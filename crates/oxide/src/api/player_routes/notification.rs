use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::AppState;
use crate::handlers::notification;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/notifications", get(notification::player_list))
        .route(
            "/notifications/unread",
            get(notification::player_list_unread),
        )
}
