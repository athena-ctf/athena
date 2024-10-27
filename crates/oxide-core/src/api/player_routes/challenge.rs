use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::challenge;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/challenges", get(challenge::player_challenges))
        .route("/challenge/details/:id", get(challenge::detailed_challenge))
}
