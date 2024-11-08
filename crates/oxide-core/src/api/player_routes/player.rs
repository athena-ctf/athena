use std::sync::Arc;

use axum::routing::{get, patch};
use axum::Router;

use crate::handlers::player;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/:username/profile",
            get(player::retrieve_profile_by_username),
        )
        .route("/:id/update-profile", patch(player::update_profile_by_id))
        .route("/summary", get(player::retrieve_summary))
}
