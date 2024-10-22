use std::sync::Arc;

use axum::routing::get;

use axum::Router;
use crate::handlers::tag;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/tag", get(tag::list).post(tag::create))
        .route(
            "/tag/:id",
            get(tag::retrieve_by_id)
                .delete(tag::delete_by_id)
                .patch(tag::update_by_id),
        )
        .route("/tag/:id/challenges", get(tag::list_challenges_by_id))
}
