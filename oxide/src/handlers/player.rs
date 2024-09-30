use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use sea_orm::{ActiveModelTrait, ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::AthenaError;
use crate::macros::api::{crud_interface, multiple_relation, optional_relation};
use crate::schemas::{
    AchievementModel, BanModel, FlagModel, InstanceModel, JsonResponse, NotificationModel,
    PlayerDetails, PlayerModel, PlayerProfile, SubmissionModel, TeamModel, TokenClaims,
    UnlockModel, UpdateProfileSchema,
};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Player);

optional_relation!(Player, Team);
optional_relation!(Player, Instance);
optional_relation!(Player, Ban);

multiple_relation!(Player, Flag);
multiple_relation!(Player, Achievement);
multiple_relation!(Player, Notification);
multiple_relation!(Player, Submission);
multiple_relation!(Player, Unlock);

#[utoipa::path(
    get,
    path = "/player/{username}/profile",
    params(("username" = String, Path, description = "Username of user")),
    responses(
        (status = 200, description = "Retrieved player profile by id successfully", body = PlayerProfile),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No player found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Retrieve player profile by username
pub async fn retrieve_profile_by_username(
    state: State<Arc<AppState>>,
    Path(username): Path<String>,
) -> ApiResult<Json<PlayerProfile>> {
    let Some(player_profile) = db::player::retrieve_profile_by_username(
        username,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Player does not exist".to_owned()));
    };

    Ok(Json(player_profile))
}

#[utoipa::path(
    patch,
    path = "/player/{id}/update-profile",
    request_body = UpdateProfileSchema,
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Updated player profile by id successfully", body = PlayerModel),
        (status = 400, description = "Invalid parameters/request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No player found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Update player profile by id
pub async fn update_profile_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateProfileSchema>,
) -> ApiResult<Json<PlayerModel>> {
    Ok(Json(
        db::player::update_profile(id, body, &state.db_conn).await?,
    ))
}

#[utoipa::path(
    get,
    path = "/player/join/{team_name}",
    params(("team_name" = String, Path, description = "Name of team to join")),
    responses(
        (status = 200, description = "Joined team by team name", body = JsonResponse),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No user found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Join team by team name
pub async fn join_team_by_team_name(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Path(team_name): Path<String>,
) -> ApiResult<Json<JsonResponse>> {
    let Some(team_model) = db::team::retrieve_by_name(&team_name, &state.db_conn).await? else {
        return Err(ApiError::NotFound(
            AthenaError::Generic(format!("Team with name '{team_name}' not found.")).to_string(),
        ));
    };

    if team_model.ban_id.is_some() {
        return Err(ApiError::BadRequest(
            AthenaError::Generic(format!(
                "Team with name '{team_name}' is banned and cannot be joined."
            ))
            .to_string(),
        ));
    }

    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Player does not exist".to_owned()));
    };

    let mut player_model = player_model.into_active_model();
    player_model.team_id = ActiveValue::Set(Some(team_model.id));

    player_model
        .update(&state.db_conn)
        .await
        .map_err(AthenaError::Db)?;

    Ok(Json(JsonResponse {
        message: "successfully joined team".to_owned(),
    }))
}
