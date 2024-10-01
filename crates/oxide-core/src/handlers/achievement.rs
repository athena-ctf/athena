use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use oxide_macros::{list_api, retrieve_api, single_relation_api, update_api};
use sea_orm::{ActiveModelTrait, ActiveValue, IntoActiveModel, ModelTrait};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementDetails, AchievementModel, ChallengeModel, PlayerModel, TokenClaims,
};
use crate::service::AppState;

list_api!(Achievement);
retrieve_api!(Achievement);
update_api!(Achievement);

single_relation_api!(Achievement, Player);
single_relation_api!(Achievement, Challenge);

#[utoipa::path(
    post,
    path = "/achievement",
    operation_id = "create_achievement",
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
) -> Result<Json<AchievementModel>> {
    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

    let player_model_cloned = player_model.clone();
    let mut active_model = player_model_cloned.into_active_model();

    active_model.score = ActiveValue::Set(player_model.score + body.prize);
    active_model.update(&state.db_conn).await?;

    Ok(Json(db::achievement::create(body, &state.db_conn).await?))
}

#[utoipa::path(
    delete,
    path = "/achievement/{id}",
    operation_id = "delete_achievement",
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
) -> Result<()> {
    if let Some(achievement_model) = db::achievement::retrieve(
        id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    {
        let Some(player_model) = db::player::retrieve(
            claims.id,
            &state.db_conn,
            &mut state.redis_client.get().await.unwrap(),
        )
        .await?
        else {
            return Err(Error::NotFound("Achievement does not exist".to_owned()));
        };

        let score = player_model.score;
        let mut active_model = player_model.into_active_model();

        active_model.score = ActiveValue::Set(score - achievement_model.prize);

        active_model.update(&state.db_conn).await?;
        achievement_model.delete(&state.db_conn).await?;

        Ok(())
    } else {
        Err(Error::NotFound("Achievement does not exist".to_owned()))
    }
}
