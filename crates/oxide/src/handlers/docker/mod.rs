use std::sync::Arc;

use axum::Router;

use crate::app_state::AppState;

pub mod container;
pub mod image;
pub mod network;
pub mod schemas;
pub mod volume;

pub fn router() -> Router<Arc<AppState>> {
    Router::new().nest(
        "/docker",
        Router::new()
            .merge(container::router())
            .merge(volume::router())
            .merge(network::router())
            .merge(image::router()),
    )
}
