use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use sea_orm::{ActiveModelTrait, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::AthenaError;
use crate::macros::api::{crud_interface, single_relation};
use crate::schemas::{InviteDetails, InviteModel, JsonResponse, TeamModel, TokenClaims};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Invite);

single_relation!(Invite, Team);

#[utoipa::path(
    get,
    path = "/invite/{id}/join",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Joined invite team by id successfully", body = JsonResponse),
        (status = 400, description = "Invalid parameters format"),
        (status = 401, description = "Action is permissible after login"),
        (status = 403, description = "User does not have sufficient permissions"),
        (status = 404, description = "No invite found with specified id"),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Join invite team by id
pub async fn join_team(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> ApiResult<Json<JsonResponse>> {
    let Some(mut invite_model) = db::invite::retrieve(
        id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Invite not found".to_owned()));
    };

    if invite_model.remaining == 0 {
        return Err(ApiError::BadRequest("Invite expired".to_owned()));
    }

    invite_model.remaining -= 1;
    let team_id = invite_model.team_id;

    invite_model
        .into_active_model()
        .update(&state.db_conn)
        .await
        .map_err(AthenaError::Db)?;

    let Some(mut player) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Player not found".to_owned()));
    };

    player.team_id = Some(team_id);

    player
        .into_active_model()
        .update(&state.db_conn)
        .await
        .map_err(AthenaError::Db)?;

    Ok(Json(JsonResponse {
        message: "Successfully joined team".to_owned(),
    }))
}
