use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{Ban, BanModel, CreateBanSchema, JsonResponse, Player, PlayerModel};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Ban);

single_relation_api!(Ban, Player);

#[utoipa::path(
    post,
    path = "/admin/ban/player/{id}",
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
    if let Some(player) = Player::find_by_id(id).one(&state.db_conn).await? {
        if player.ban_id.is_some() {
            return Err(Error::BadRequest("Player is already banned".to_owned()));
        }

        let ban_model = body.into_active_model().insert(&state.db_conn).await?;
        let mut active_player = player.into_active_model();
        active_player.ban_id = ActiveValue::Set(Some(ban_model.id));

        active_player.update(&state.db_conn).await?;

        Ok(Json(ban_model))
    } else {
        Err(Error::NotFound("Player does not exist".to_owned()))
    }
}
