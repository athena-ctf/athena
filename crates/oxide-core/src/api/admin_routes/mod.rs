use std::sync::Arc;

use axum::Router;

use crate::handlers;
use crate::service::AppState;

mod utils;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/admin",
        Router::new()
            .merge(handlers::achievement::router())
            .merge(handlers::ban::router())
            .merge(handlers::challenge::router())
            .merge(handlers::challenge_tag::router())
            .merge(handlers::container::router())
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
            .merge(utils::router())
            .merge(handlers::deployment::router()),
    )
}
