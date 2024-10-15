use std::sync::Arc;

use axum::extract::{Json, Path, State};
use entity::extensions::UpdateProfileSchema;
use oxide_macros::{crud_interface_api, multiple_relation_api, optional_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementModel, BanModel, FlagModel, InstanceModel, NotificationModel, PlayerDetails,
    PlayerModel, PlayerProfile, SubmissionModel, TeamModel, UnlockModel,
};
use crate::service::AppState;

crud_interface_api!(Player);

optional_relation_api!(Player, Team);
optional_relation_api!(Player, Instance);
optional_relation_api!(Player, Ban);

multiple_relation_api!(Player, Flag);
multiple_relation_api!(Player, Achievement);
multiple_relation_api!(Player, Notification);
multiple_relation_api!(Player, Submission);
multiple_relation_api!(Player, Unlock);

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
) -> Result<Json<PlayerProfile>> {
    let Some(player_profile) = db::player::retrieve_profile_by_username(
        username,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
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
) -> Result<Json<PlayerModel>> {
    Ok(Json(
        db::player::update_profile(id, body, &state.db_conn).await?,
    ))
}
