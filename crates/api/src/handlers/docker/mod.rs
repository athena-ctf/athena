use std::sync::Arc;

use axum::Router;

use crate::AppState;

#[allow(clippy::all, clippy::pedantic, clippy::nursery)]
pub mod schemas;

pub mod container;
pub mod image;
pub mod network;
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
