use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::deployment;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/deployment",
            get(deployment::list).post(deployment::create),
        )
        .route(
            "/deployment/:id",
            get(deployment::retrieve_by_id)
                .delete(deployment::delete_by_id)
                .patch(deployment::update_by_id),
        )
        .route(
            "/deployment/:id/challenge",
            get(deployment::retrieve_challenge_by_id),
        )
        .route(
            "/deployment/:id/player",
            get(deployment::retrieve_player_by_id),
        )
        .route(
            "/deployment/:id/instances",
            get(deployment::list_instances_by_id),
        )
}
