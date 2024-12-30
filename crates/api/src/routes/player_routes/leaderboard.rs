use std::sync::Arc;

use axum::Router;
use axum::routing::get;

use crate::AppState;
use crate::handlers::leaderboard;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/leaderboard/top10", get(leaderboard::player_top_10))
        .route("/leaderboard/rankings", get(leaderboard::player_rankings))
        .route("/leaderboard/team/top10", get(leaderboard::team_top_10))
        .route("/leaderboard/team/rankings", get(leaderboard::team_rankings))
}
