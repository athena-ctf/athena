use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use sea_orm::{ActiveModelTrait, ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::AthenaError;
use crate::macros::api::{list, retrieve, single_relation, update};
use crate::schemas::{
    AchievementDetails, AchievementModel, ChallengeModel, PlayerModel, TeamModel, TokenClaims,
};
use crate::service::{ApiError, ApiResult, AppState};

list!(Achievement);
retrieve!(Achievement);
update!(Achievement);

single_relation!(Achievement, Player);
single_relation!(Achievement, Challenge);

#[utoipa::path(
    post,
    path = "/achievement",
    request_body = AchievementDetails,
    responses(
        (status = 201, description = "Created achievement successfully", body = AchievementModel),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Create achievement
pub async fn create(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Json(body): Json<AchievementDetails>,
) -> ApiResult<Json<AchievementModel>> {
    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Player does not exist".to_owned()));
    };

    let player_model_cloned = player_model.clone();
    let mut active_model = player_model_cloned.into_active_model();

    active_model.score = ActiveValue::Set(player_model.score + body.prize);

    active_model
        .update(&state.db_conn)
        .await
        .map_err(AthenaError::from)?;

    Ok(Json(db::achievement::create(body, &state.db_conn).await?))
}

#[utoipa::path(
    delete,
    path = "/achievement/{id}",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 204, description = "Deleted achievement by id successfully"),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No achievement found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Delete achievement by id
pub async fn delete(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> ApiResult<()> {
    if db::achievement::delete(
        id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    {
        let Some(player) = db::player::retrieve(
            id,
            &state.db_conn,
            &mut state.redis_client.get().await.unwrap(),
        )
        .await?
        else {
            return Err(ApiError::NotFound("Achievement does not exist".to_owned()));
        };

        let score = player.score;
        let mut active_model = player.into_active_model();

        todo!();
        Ok(())
    } else {
        Err(ApiError::NotFound("Achievement does not exist".to_owned()))
    }
}
