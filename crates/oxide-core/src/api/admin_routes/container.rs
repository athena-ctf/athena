use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::container;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/container", get(container::list).post(container::create))
        .route(
            "/container/:id",
            get(container::retrieve_by_id)
                .delete(container::delete_by_id)
                .patch(container::update_by_id),
        )
        .route(
            "/container/:id/challenge",
            get(container::retrieve_challenge_by_id),
        )
}
