use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::challenge;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/challenge", get(challenge::list).post(challenge::create))
        .route(
            "/challenge/:id",
            get(challenge::retrieve_by_id)
                .delete(challenge::delete_by_id)
                .patch(challenge::update_by_id),
        )
        .route("/challenge/:id/files", get(challenge::list_files_by_id))
        .route("/challenge/:id/hints", get(challenge::list_hints_by_id))
        .route(
            "/challenge/:id/instances",
            get(challenge::list_instances_by_id),
        )
        .route("/challenge/:id/tags", get(challenge::list_tags_by_id))
        .route(
            "/challenge/:id/solves",
            get(challenge::calculate_solves_by_id),
        )
        .route(
            "/challenge/:id/relations",
            get(challenge::retrieve_relations_by_id),
        )
        .route(
            "/challenge/:id/achievement",
            get(challenge::list_achievements_by_id),
        )
}
