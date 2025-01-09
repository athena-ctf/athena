use std::sync::Arc;

use axum::Router;
use axum::routing::{get, post};

use crate::{AppState, handlers};

pub fn utils_router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/ban/player/{id}", post(handlers::ban::add_player_by_id))
        .route("/unban/player/{id}", post(handlers::ban::remove_player_by_id))
        .route("/current", get(handlers::admin::get_current_logged_in))
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/admin",
        Router::new()
            .merge(handlers::award::router())
            .merge(handlers::admin::router())
            .merge(handlers::ban::router())
            .merge(handlers::challenge_file::router())
            .merge(handlers::challenge::router())
            .merge(handlers::container::router())
            .merge(handlers::deployment::router())
            .merge(handlers::docker::router())
            .merge(handlers::file::router())
            .merge(handlers::fileserver::router())
            .merge(handlers::flag::router())
            .merge(handlers::hint::router())
            .merge(handlers::instance::router())
            .merge(handlers::invite::router())
            .merge(handlers::notification::router())
            .merge(handlers::rbac::router())
            .merge(handlers::player_award::router())
            .merge(handlers::player::router())
            .merge(handlers::settings::router())
            .merge(handlers::submission::router())
            .merge(handlers::team::router())
            .merge(handlers::ticket::router())
            .merge(handlers::unlock::router())
            .merge(utils_router()),
    )
}
