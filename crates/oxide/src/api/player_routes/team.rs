use std::sync::Arc;

use axum::Router;
use axum::routing::{get, patch};

use crate::app_state::AppState;
use crate::handlers::team;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "team/:teamname/profile",
            get(team::retrieve_team_by_teamname),
        )
        .route("team/:id/update-details", patch(team::update_details))
        .route("/summary", get(team::retrieve_summary))
}
