use std::sync::Arc;

use axum::Router;

use crate::AppState;

mod challenge;
mod file;
mod flag;
mod hint;
mod instance;
mod invite;
mod leaderboard;
mod notification;
mod player;
mod team;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/player",
        Router::new()
            .merge(challenge::router())
            .merge(file::router())
            .merge(flag::router())
            .merge(hint::router())
            .merge(instance::router())
            .merge(invite::router())
            .merge(player::router())
            .merge(team::router())
            .merge(leaderboard::router())
            .merge(notification::router()),
    )
}
