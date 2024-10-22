use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::leaderboard;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/leaderboard",
            get(leaderboard::list).post(leaderboard::create),
        )
        .route(
            "/leaderboard/:id",
            get(leaderboard::retrieve_by_id)
                .delete(leaderboard::delete_by_id)
                .patch(leaderboard::update_by_id),
        )
}
