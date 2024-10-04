use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::admin;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/admin", get(admin::list).post(admin::create))
        .route(
            "/admin/:id",
            get(admin::retrieve_by_id)
                .delete(admin::delete_by_id)
                .patch(admin::update_by_id),
        )
        .route("/admin/:id/tickets", get(admin::list_tickets_by_id))
}
