use crate::redis_keys::PLAYER_LAST_UPDATED;

oxide_macros::crud!(Ban, single: [Player], optional: [], multiple: []);

#[utoipa::path(
    post,
    path = "/admin/ban/player/{id}",
    request_body = CreateBanSchema,
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Banned player by id successfully", body = BanModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No ban found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Ban player by id
pub async fn add_player_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<CreateBanSchema>,
) -> Result<ApiResponse<Json<BanModel>>> {
    if let Some(player) = Player::find_by_id(id).one(&state.db_conn).await? {
        if player.ban_id.is_some() {
            return Err(Error::BadRequest("Player is already banned".to_owned()));
        }

        let ban_model = body.into_active_model().insert(&state.db_conn).await?;
        let mut active_player = player.clone().into_active_model();
        active_player.ban_id = ActiveValue::Set(Some(ban_model.id));

        let player_model = active_player.update(&state.db_conn).await?;

        state
            .redis_client
            .hset::<(), _, _>(
                PLAYER_LAST_UPDATED,
                (
                    player_model.id.to_string(),
                    player_model.updated_at.timestamp(),
                ),
            )
            .await?;

        Ok(ApiResponse::json(ban_model))
    } else {
        Err(Error::NotFound("Player does not exist".to_owned()))
    }
}

#[utoipa::path(
    post,
    path = "/admin/unban/player/{id}",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Unbanned player by id successfully", body = JsonResponse),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "Admin does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No ban found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Unban player by id
pub async fn remove_player_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    if let Some(player) = Player::find_by_id(id).one(&state.db_conn).await? {
        let Some(ban_id) = player.ban_id else {
            return Err(Error::BadRequest("Player is not banned".to_owned()));
        };

        let mut active_player = player.clone().into_active_model();
        active_player.ban_id = ActiveValue::Set(None);

        let player_model = active_player.update(&state.db_conn).await?;

        Ban::delete_by_id(ban_id).exec(&state.db_conn).await?;

        state
            .redis_client
            .hset::<(), _, _>(
                PLAYER_LAST_UPDATED,
                (
                    player_model.id.to_string(),
                    player_model.updated_at.timestamp(),
                ),
            )
            .await?;

        Ok(ApiResponse::json(JsonResponse {
            message: "successfully unbanned player".to_owned(),
        }))
    } else {
        Err(Error::NotFound("Player does not exist".to_owned()))
    }
}
