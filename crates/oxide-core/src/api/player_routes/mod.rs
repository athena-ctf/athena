use std::sync::Arc;

use axum::Router;

use crate::service::AppState;

mod challenge;
mod flag;
mod hint;
mod player;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/player",
        Router::new()
            .merge(challenge::router())
            .merge(flag::router())
            .merge(hint::router())
            .merge(player::router()),
    )
}
