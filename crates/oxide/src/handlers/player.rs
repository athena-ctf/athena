use crate::jwt::AuthPlayer;
use crate::redis_keys::PLAYER_LAST_UPDATED;
use crate::schemas::{
    Award, AwardModel, Ban, BanModel, Challenge, ChallengeModel, CreatePlayerSchema, Deployment,
    DeploymentModel, Flag, FlagModel, Hint, HintModel, JsonResponse, Notification,
    NotificationModel, Player, PlayerAward, PlayerAwardModel, PlayerDetails, PlayerModel,
    PlayerProfile, Submission, SubmissionModel, Team, TeamModel, Ticket, TicketModel, Unlock,
    UnlockModel, UpdateProfileSchema,
};

oxide_macros::crud!(Player, single: [Team], optional: [Deployment, Ban], multiple: [Flag, Award, PlayerAward, Notification, Submission, Unlock, Challenge, Hint, Ticket]);

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
        super::retrieve_profile(player_model, &state.db_conn, &state.redis_client).await?,
    ))
}

#[utoipa::path(
    patch,
    path = "/player/update-profile",
    request_body = UpdateProfileSchema,
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
    AuthPlayer(player_claims): AuthPlayer,
    Json(body): Json<UpdateProfileSchema>,
) -> Result<Json<PlayerModel>> {
    let mut active_player = body.into_active_model();
    active_player.id = ActiveValue::Set(player_claims.sub);

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

    Ok(Json(player_model))
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
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<PlayerDetails>> {
    let Some(player_model) = Player::find_by_id(player.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(Json(PlayerDetails {
        submissions: player_model
            .find_related(Submission)
            .all(&state.db_conn)
            .await?,
        unlocks: player_model
            .find_related(Unlock)
            .all(&state.db_conn)
            .await?,
        profile: super::retrieve_profile(player_model, &state.db_conn, &state.redis_client)
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
pub async fn get_current_logged_in(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<PlayerModel>> {
    let Some(model) = Player::find_by_id(player.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(Json(model))
}
