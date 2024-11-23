use crate::jwt::AuthPlayer;
use crate::schemas::{
    CreateNotificationSchema, JsonResponse, Notification, NotificationModel, Player, PlayerModel,
};

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
                    .eq(player.sub)
                    .or(entity::notification::Column::PlayerId.is_null()),
            )
            .all(&state.db_conn)
            .await?,
    ))
}
