use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use entity::extensions::UpdateProfileSchema;
use fred::prelude::*;
use oxide_macros::{
    crud_interface_api, multiple_relation_api, optional_relation_api, single_relation_api,
};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementModel, BanModel, CreatePlayerSchema, FlagModel, InstanceModel, JsonResponse,
    NotificationModel, PlayerModel, PlayerProfile, PlayerSummary, SubmissionModel, TeamModel,
    TokenClaims, UnlockModel,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Player);

single_relation_api!(Player, Team);

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
    let Some(player_profile) = db::player::retrieve_profile_by_username(
        username,
        &state.db_conn,
        &state.persistent_client,
    )
    .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

    Ok(Json(player_profile))
}

#[utoipa::path(
    put,
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
    Ok(Json(
        db::player::update_profile(id, body, &state.db_conn).await?,
    ))
}

#[utoipa::path(
    get,
    path = "/player/summary",
    operation_id = "retrieve_player_summary",
    responses(
        (status = 200, description = "Retrieved player summary by id successfully", body = PlayerSummary),
        (status = 400, description = "Invalid parameters/request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No player found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve player summary
pub async fn retrieve_summary(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<PlayerSummary>> {
    let Some(summary) = db::player::retrieve_player_summary_by_id(
        claims.id,
        &state.db_conn,
        &state.persistent_client,
    )
    .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

    Ok(Json(summary))
}
