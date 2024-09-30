use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::ban;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/ban", get(ban::list).post(ban::create))
        .route(
            "/ban/:id",
            get(ban::retrieve_by_id)
                .delete(ban::delete_by_id)
                .patch(ban::update_by_id),
        )
        .route("/ban/player/:id", post(ban::add_player_by_id))
        .route("/ban/team/:id", post(ban::add_team_by_id))
        .route("/ban/:id/player", get(ban::retrieve_player_by_id))
        .route("/ban/:id/team", get(ban::retrieve_team_by_id))
}
