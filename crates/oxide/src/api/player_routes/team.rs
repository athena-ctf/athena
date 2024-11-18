use std::sync::Arc;

use axum::routing::{get, patch};
use axum::Router;

use crate::handlers::team;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "team/:teamname/profile",
            get(team::retrieve_team_by_teamname),
        )
        .route("team/:id/update-details", patch(team::update_details))
        .route("/summary", get(team::retrieve_summary))
}
