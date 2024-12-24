use std::sync::Arc;

use axum::Router;

use crate::app_state::AppState;

pub mod containers;
pub mod images;
pub mod networks;
pub mod schemas;
pub mod volumes;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/docker",
        Router::new()
            .merge(containers::router())
            .merge(volumes::router())
            .merge(networks::router())
            .merge(images::router()),
    )
}
