use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, optional_relation};
use crate::schemas::{BanDetails, BanModel, PlayerModel, TeamModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Ban);

optional_relation!(Ban, Player);
optional_relation!(Ban, Team);

#[utoipa::path(
    post,
    path = "/ban/player/{id}",
    request_body = BanDetails,
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 201, description = "Banned player by id successfully", body = BanModel),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No ban found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Ban player by id
pub async fn add_player_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<BanDetails>,
) -> ApiResult<Json<BanModel>> {
    db::player::ban(id, body, &state.db_conn)
        .await?
        .map_or_else(
            || Err(ApiError::NotFound("Ban does not exist".to_owned())),
            |ban| Ok(Json(ban)),
        )
}

#[utoipa::path(
    post,
    path = "/ban/team/{id}",
    request_body = BanDetails,
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 201, description = "Banned team by id successfully", body = BanModel),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No ban found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Ban team by id
pub async fn add_team_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<BanDetails>,
) -> ApiResult<Json<BanModel>> {
    db::team::ban(id, body, &state.db_conn).await?.map_or_else(
        || Err(ApiError::NotFound("Ban does not exist".to_owned())),
        |ban| Ok(Json(ban)),
    )
}
