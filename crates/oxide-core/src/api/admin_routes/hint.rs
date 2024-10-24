use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::hint;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/hint", get(hint::list).post(hint::create))
        .route(
            "/hint/:id",
            get(hint::retrieve_by_id)
                .delete(hint::delete_by_id)
                .patch(hint::update_by_id),
        )
        .route("/hint/:id/challenge", get(hint::retrieve_challenge_by_id))
        .route("/hint/:id/unlocks", get(hint::list_unlocks_by_id))
}
