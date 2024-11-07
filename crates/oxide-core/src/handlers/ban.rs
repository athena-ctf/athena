use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{Ban, BanModel, CreateBanSchema, JsonResponse, Player, PlayerModel};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Ban);

single_relation_api!(Ban, Player);

#[utoipa::path(
    post,
    path = "/ban/player/{id}",
    request_body = CreateBanSchema,
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 201, description = "Banned player by id successfully", body = BanModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No ban found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Ban player by id
pub async fn add_player_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
    Json(body): Json<CreateBanSchema>,
) -> Result<Json<BanModel>> {
    db::player::ban(id, body, &state.db_conn)
        .await?
        .map_or_else(
            || Err(Error::NotFound("Ban does not exist".to_owned())),
            |ban| Ok(Json(ban)),
        )
}
