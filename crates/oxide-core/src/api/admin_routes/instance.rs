use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::instance;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/instance", get(instance::list).post(instance::create))
        .route(
            "/instance/:id",
            get(instance::retrieve_by_id)
                .delete(instance::delete_by_id)
                .patch(instance::update_by_id),
        )
        .route(
            "/instance/:id/challenge",
            get(instance::retrieve_challenge_by_id),
        )
        .route("/instance/:id/player", get(instance::retrieve_player_by_id))
}
