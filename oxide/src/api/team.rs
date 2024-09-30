use std::sync::Arc;

use axum::routing::get;
use axum::Router;

use crate::handlers::team;
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/team", get(team::list).post(team::create))
        .route(
            "/team/:id",
            get(team::retrieve_by_id)
                .delete(team::delete_by_id)
                .patch(team::update_by_id),
        )
        .route("/team/:id/invites", get(team::list_invites_by_id))
        .route("/team/:id/players", get(team::list_players_by_id))
}
