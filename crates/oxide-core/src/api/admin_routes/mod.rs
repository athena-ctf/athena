use std::sync::Arc;

use axum::Router;

use crate::service::AppState;

mod achievement;
mod admin;
mod ban;
mod challenge;
mod challenge_tag;
mod file;
mod flag;
mod hint;
mod instance;
mod invite;
mod leaderboard;
mod notification;
mod player;
mod submission;
mod tag;
mod team;
mod ticket;
mod unlock;
mod utils;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/admin",
        Router::new()
            .merge(achievement::router())
            .merge(ban::router())
            .merge(challenge::router())
            .merge(challenge_tag::router())
            .merge(file::router())
            .merge(flag::router())
            .merge(hint::router())
            .merge(instance::router())
            .merge(invite::router())
            .merge(leaderboard::router())
            .merge(admin::router())
            .merge(notification::router())
            .merge(player::router())
            .merge(submission::router())
            .merge(tag::router())
            .merge(team::router())
            .merge(ticket::router())
            .merge(unlock::router())
            .merge(utils::router()),
    )
}
