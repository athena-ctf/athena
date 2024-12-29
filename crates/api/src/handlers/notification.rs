use chrono::Utc;

use crate::jwt::AuthPlayer;

api_macros::crud!(Notification, single: [], optional: [Player], multiple: []);

#[utoipa::path(
    get,
    path = "/player/notifications",
    responses(
        (status = 200, body = [NotificationModel]),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
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
        (status = 200, body = [NotificationModel]),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
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
