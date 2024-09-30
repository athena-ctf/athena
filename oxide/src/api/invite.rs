use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::invite;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/invite", get(invite::list).post(invite::create))
        .route(
            "/invite/:id",
            get(invite::retrieve_by_id)
                .delete(invite::delete_by_id)
                .patch(invite::update_by_id),
        )
        .route("/invite/:id/team", get(invite::retrieve_team_by_id))
        .route("/invite/:id/join", get(invite::join_team))
}
