use std::sync::Arc;

use axum::Router;

use crate::app_state::AppState;

pub mod admin;
pub mod player;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().merge(player::router()).merge(admin::router())
}
