use std::sync::Arc;

use axum::routing::{get, patch};

use super::router_wrapper::Router;
use crate::handlers::player::{self};
use crate::service::AppState;

pub fn router() -> Router<Arc<AppState>> {
    Router::new()
        .route("/player", get(player::list).post(player::create))
        .route(
            "/player/:id",
            get(player::retrieve_by_id)
                .delete(player::delete_by_id)
                .patch(player::update_by_id),
        )
        .route(
            "/player/:username/profile",
            get(player::retrieve_profile_by_username),
        )
        .route("/player/:id/flags", get(player::list_flags_by_id))
        .route("/player/:id/instance", get(player::retrieve_instance_by_id))
        .route("/player/:id/team", get(player::retrieve_team_by_id))
        .route(
            "/player/:id/update-profile",
            patch(player::update_profile_by_id),
        )
        .route(
            "/player/:id/achievements",
            get(player::list_achievements_by_id),
        )
        .route(
            "/player/:id/notifications",
            get(player::list_notifications_by_id),
        )
        .route(
            "/player/:id/submissions",
            get(player::list_submissions_by_id),
        )
        .route("/player/:id/unlocks", get(player::list_unlocks_by_id))
        .route("/player/:id/ban", get(player::retrieve_ban_by_id))
        .route(
            "/player/join/:team_name",
            get(player::join_team_by_team_name),
        )
}
