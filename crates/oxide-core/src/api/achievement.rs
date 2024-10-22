use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::achievement;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/achievement",
            get(achievement::list).post(achievement::create),
        )
        .route(
            "/achievement/:id",
            get(achievement::retrieve_by_id)
                .patch(achievement::update_by_id)
                .delete(achievement::delete_by_id),
        )
        .route(
            "/achievement/:id/player",
            get(achievement::retrieve_player_by_id),
        )
        .route(
            "/achievement/:id/challenge",
            get(achievement::retrieve_challenge_by_id),
        )
}
