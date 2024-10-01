use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::submission;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/submission",
            get(submission::list).post(submission::create),
        )
        .route(
            "/submission/:id-:id",
            get(submission::retrieve_by_id)
                .delete(submission::delete_by_id)
                .patch(submission::update_by_id),
        )
}
