use std::sync::Arc;

use axum::routing::post;
use axum::Router;

use crate::handlers::ban;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/ban/player/:id", post(ban::add_player_by_id))
}
