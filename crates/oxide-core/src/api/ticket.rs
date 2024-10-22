use std::sync::Arc;

use axum::routing::get;

use axum::Router;
use crate::handlers::ticket;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/ticket", get(ticket::list).post(ticket::create))
        .route(
            "/ticket/:id",
            get(ticket::retrieve_by_id)
                .delete(ticket::delete_by_id)
                .patch(ticket::update_by_id),
        )
        .route("/ticket/:id/admin", get(ticket::retrieve_admin_by_id))
}
