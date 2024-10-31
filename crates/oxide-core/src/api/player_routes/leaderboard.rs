use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::leaderboard;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/leaderboard/top10", get(leaderboard::top_10))
        .route("/leaderboard/rankings", get(leaderboard::rankings))
}
