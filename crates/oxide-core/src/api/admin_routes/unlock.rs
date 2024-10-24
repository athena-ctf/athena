use std::sync::Arc;

use axum::routing::get;

use axum::Router;
use crate::handlers::unlock;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/unlock", get(unlock::list).post(unlock::create))
        .route(
            "/unlock/:id-:id",
            get(unlock::retrieve_by_id)
                .delete(unlock::delete_by_id)
                .patch(unlock::update_by_id),
        )
}
