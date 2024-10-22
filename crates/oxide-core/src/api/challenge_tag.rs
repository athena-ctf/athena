use std::sync::Arc;

use axum::routing::get;

use axum::Router;
use crate::handlers::challenge_tag;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/challenge_tag",
            get(challenge_tag::list).post(challenge_tag::create),
        )
        .route(
            "/challenge_tag/:id-:id",
            get(challenge_tag::retrieve_by_id)
                .delete(challenge_tag::delete_by_id)
                .patch(challenge_tag::update_by_id),
        )
}
