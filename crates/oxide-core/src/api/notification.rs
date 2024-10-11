use std::sync::Arc;

use axum::routing::get;

use super::router_wrapper::Router;
use crate::handlers::notification;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/notification",
            get(notification::list).post(notification::create),
        )
        .route(
            "/notification/:id",
            get(notification::retrieve_by_id)
                .delete(notification::delete_by_id)
                .patch(notification::update_by_id),
        )
        .route(
            "/notification/:id/player",
            get(notification::retrieve_player_by_id),
        )
}
