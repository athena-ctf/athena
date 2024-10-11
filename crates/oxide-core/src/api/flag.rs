use std::sync::Arc;

use axum::routing::{get, post};

use super::router_wrapper::Router;
use crate::handlers::flag;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/flag", get(flag::list).post(flag::create))
        .route("/flag/verify", post(flag::verify))
        .route(
            "/flag/:id",
            get(flag::retrieve_by_id)
                .delete(flag::delete_by_id)
                .patch(flag::update_by_id),
        )
        .route("/flag/:id/challenge", get(flag::retrieve_challenge_by_id))
        .route("/flag/:id/player", get(flag::retrieve_player_by_id))
}
