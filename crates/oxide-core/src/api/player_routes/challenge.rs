use std::sync::Arc;

use axum::routing::{get, post};
use axum::Router;

use crate::handlers::challenge;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/challenges", get(challenge::player_challenges))
        .route("/challenge/details/:id", get(challenge::detailed_challenge))
        .route("/challenge/start/:id", post(challenge::start_challenge))
        .route("/challenge/stop/:id", post(challenge::stop_challenge))
}
