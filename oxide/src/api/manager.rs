use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::manager;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/manager", get(manager::list).post(manager::create))
        .route(
            "/manager/:id",
            get(manager::retrieve_by_id)
                .delete(manager::delete_by_id)
                .patch(manager::update_by_id),
        )
        .route("/manager/:id/tickets", get(manager::list_tickets_by_id))
}
