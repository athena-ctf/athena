use std::sync::Arc;

use axum::Router;
use axum::routing::{get, patch};

use crate::AppState;
use crate::handlers::player;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/:username/profile", get(player::retrieve_profile_by_username))
        .route("/update-profile", patch(player::update_profile_by_id))
        .route("/summary", get(player::retrieve_summary))
        .route("/current", get(player::get_current_logged_in))
}
