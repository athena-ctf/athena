use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use oxide_macros::table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, TransactionTrait};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    AuthPlayer, Challenge, ChallengeModel, CreateHintSchema, Hint, HintModel, JsonResponse, Player,
    PlayerModel, Unlock, UnlockModel,
};
use crate::service::{AppState, CachedJson};

table_api!(Hint, single: [Challenge], optional: [], multiple: [Unlock, Player]);

#[utoipa::path(
    get,
    path = "/player/hint/unlock/{id}",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Unlocked hint by id successfully", body = HintModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No hint found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Unlock hint by id
pub async fn unlock_by_id(
    AuthPlayer(player_model): AuthPlayer,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<HintModel>> {
    let txn = state.db_conn.begin().await?;

    if let Some((_, Some(hint_model))) = Unlock::find_by_id((player_model.id, id))
        .find_also_related(Hint)
        .one(&txn)
        .await?
    {
        return Ok(Json(hint_model));
    }

    UnlockModel::new(player_model.id, id)
        .into_active_model()
        .insert(&txn)
        .await?;

    let Some(hint_model) = Hint::find_by_id(id).one(&txn).await? else {
        return Err(Error::NotFound("Hint not found".to_owned()));
    };

    let score = player_model.score;

    state
        .persistent_client
        .zincrby::<(), _, _>(
            "leaderboard",
            f64::from(-hint_model.cost),
            &player_model.id.simple().to_string(),
        )
        .await?;

    let mut active_model = player_model.into_active_model();
    active_model.score = ActiveValue::Set(score - hint_model.cost);

    active_model.update(&txn).await?;

    Ok(Json(hint_model))
}
