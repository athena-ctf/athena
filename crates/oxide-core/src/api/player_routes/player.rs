use std::sync::Arc;

use axum::routing::{get, put};
use axum::Router;

use crate::handlers::player;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/player/:username/profile",
            get(player::retrieve_profile_by_username),
        )
        .route(
            "/player/:id/update-profile",
            put(player::update_profile_by_id),
        )
}
