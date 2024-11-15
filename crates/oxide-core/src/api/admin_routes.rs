use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers;
use crate::service::AppState;

pub fn utils_router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/ban/player/:id", post(handlers::ban::add_player_by_id))
        .route("/stats", get(handlers::stats::retrieve))
        .route("/current", get(handlers::admin::get_current_logged_in))
        .route(
            "/settings/*path",
            get(handlers::settings::retrieve).patch(handlers::settings::update),
        )
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/admin",
        Router::new()
            .merge(handlers::achievement::router())
            .merge(handlers::ban::router())
            .merge(handlers::challenge::router())
            .merge(handlers::challenge_file::router())
            .merge(handlers::challenge_tag::router())
            .merge(handlers::container::router())
            .merge(handlers::deployment::router())
            .merge(handlers::file::router())
            .merge(handlers::flag::router())
            .merge(handlers::hint::router())
            .merge(handlers::instance::router())
            .merge(handlers::invite::router())
            .merge(handlers::admin::router())
            .merge(handlers::notification::router())
            .merge(handlers::player::router())
            .merge(handlers::submission::router())
            .merge(handlers::tag::router())
            .merge(handlers::team::router())
            .merge(handlers::ticket::router())
            .merge(handlers::unlock::router())
            .merge(utils_router()),
    )
}
