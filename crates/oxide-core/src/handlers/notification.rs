use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    AuthPlayer, CreateNotificationSchema, JsonResponse, Notification, NotificationModel, Player,
    PlayerModel,
};
use crate::service::{AppState, CachedJson};

oxide_macros::crud!(Notification, single: [], optional: [Player], multiple: []);

#[utoipa::path(
    get,
    path = "/player/notifications",
    responses(
        (status = 200, description = "Listed notifications successfully", body = [NotificationModel]),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No hint found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List player notifications
pub async fn player_list(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<Vec<NotificationModel>>> {
    Ok(Json(
        Notification::find()
            .filter(
                entity::notification::Column::PlayerId
                    .eq(player.id)
                    .or(entity::notification::Column::PlayerId.is_null()),
            )
            .all(&state.db_conn)
            .await?,
    ))
}
