use std::sync::Arc;

use axum::Router;

use crate::service::AppState;

mod challenge;
mod flag;
mod hint;
mod invite;
mod leaderboard;
mod player;
mod team;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/player",
        Router::new()
            .merge(challenge::router())
            .merge(flag::router())
            .merge(hint::router())
            .merge(player::router())
            .merge(team::router())
            .merge(invite::router())
            .merge(leaderboard::router()),
    )
}
