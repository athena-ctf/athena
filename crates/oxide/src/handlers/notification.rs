use chrono::Utc;

use crate::jwt::AuthPlayer;

oxide_macros::crud!(Notification, single: [], optional: [Player], multiple: []);

#[utoipa::path(
    get,
    path = "/player/notifications",
    responses(
        (status = 200, description = "Listed notifications successfully", body = [NotificationModel]),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No hint found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List player notifications
pub async fn player_list(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<Vec<NotificationModel>>>> {
    Ok(ApiResponse::json(
        Notification::find()
            .filter(entity::notification::Column::PlayerId.eq(player.sub))
            .all(&state.db_conn)
            .await?,
    ))
}

#[utoipa::path(
    get,
    path = "/player/notifications/unread",
    responses(
        (status = 200, description = "Listed unread notifications successfully", body = [NotificationModel]),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No hint found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List unread player notifications
pub async fn player_list_unread(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<Vec<NotificationModel>>>> {
    Ok(ApiResponse::json(
        Notification::update_many()
            .col_expr(
                entity::notification::Column::ReadAt,
                Expr::value(Some(Utc::now().fixed_offset())),
            )
            .filter(entity::notification::Column::PlayerId.eq(player.sub))
            .exec_with_returning(&state.db_conn)
            .await?,
    ))
}
