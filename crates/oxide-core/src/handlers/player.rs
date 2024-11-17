use crate::schemas::{
    Achievement, AchievementModel, AuthPlayer, Ban, BanModel, Challenge, ChallengeModel,
    CreatePlayerSchema, Deployment, DeploymentModel, Flag, FlagModel, Hint, HintModel,
    JsonResponse, Notification, NotificationModel, Player, PlayerAchievement,
    PlayerAchievementModel, PlayerDetails, PlayerModel, PlayerProfile, Submission, SubmissionModel,
    Team, TeamModel, Ticket, TicketModel, Unlock, UnlockModel, UpdateProfileSchema,
};

oxide_macros::crud!(Player, single: [Team], optional: [Deployment, Ban], multiple: [Flag, Achievement, PlayerAchievement, Notification, Submission, Unlock, Challenge, Hint, Ticket]);

#[utoipa::path(
    get,
    path = "/player/{username}/profile",
    params(("username" = String, Path, description = "Username of user")),
    responses(
        (status = 200, description = "Retrieved player profile by id successfully", body = PlayerProfile),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve player profile by username
pub async fn retrieve_profile_by_username(
    state: State<Arc<AppState>>,
    Path(username): Path<String>,
) -> Result<Json<PlayerProfile>> {
    let Some(player_model) = Player::find()
        .filter(entity::player::Column::Username.eq(&username))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(Json(
        super::retrieve_profile(player_model, &state.db_conn, &state.persistent_client).await?,
    ))
}

#[utoipa::path(
    patch,
    path = "/player/{id}/update-profile",
    request_body = UpdateProfileSchema,
    params(("id" = Uuid, Path, description = "Id of entity")),
    operation_id = "update_player_profile",
    responses(
        (status = 200, description = "Updated player profile by id successfully", body = PlayerModel),
        (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Update player profile by id
pub async fn update_profile_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateProfileSchema>,
) -> Result<Json<PlayerModel>> {
    let mut player = body.into_active_model();
    player.id = ActiveValue::Set(id);

    Ok(Json(player.update(&state.db_conn).await?))
}

#[utoipa::path(
    get,
    path = "/player/summary",
    operation_id = "retrieve_player_summary",
    responses(
        (status = 200, description = "Retrieved player summary by id successfully", body = PlayerDetails),
        (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve player summary
pub async fn retrieve_summary(
    AuthPlayer(player_model): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<PlayerDetails>> {
    Ok(Json(PlayerDetails {
        submissions: player_model
            .find_related(Submission)
            .all(&state.db_conn)
            .await?,
        unlocks: player_model
            .find_related(Unlock)
            .all(&state.db_conn)
            .await?,
        profile: super::retrieve_profile(player_model, &state.db_conn, &state.persistent_client)
            .await?,
    }))
}

#[utoipa::path(
    get,
    path = "/player/current",
    operation_id = "player_get_current",
    responses(
        (status = 200, description = "Retrieved current logged in user successfully", body = PlayerModel),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 404, description = "User not found", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    ),
)]
/// Return currently authenticated user
pub async fn get_current_logged_in(AuthPlayer(player): AuthPlayer) -> Result<Json<PlayerModel>> {
    Ok(Json(player))
}
