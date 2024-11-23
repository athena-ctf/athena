use chrono::Utc;
use sea_orm::TransactionTrait;

use crate::jwt::AuthPlayer;
use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD, TEAM_LEADERBOARD};
use crate::schemas::{
    Challenge, ChallengeModel, CreateHintSchema, Hint, HintModel, JsonResponse, Player,
    PlayerModel, Unlock, UnlockModel,
};

oxide_macros::crud!(
    Hint,
    single: [Challenge],
    optional: [],
    multiple: [Unlock, Player],
    on_delete: {
        for player_model in model.find_related(Player).all(&state.db_conn).await? {
            state
                .persistent_client
                .zincrby::<(), _, _>(
                    PLAYER_LEADERBOARD,
                    f64::from(model.cost),
                    player_model.id.simple().to_string()
                ).await?;

            state
                .persistent_client
                .lpush::<(), _, _>(
                    player_history_key(player_model.id),
                    vec![format!(
                        "{}:{}",
                        Utc::now().timestamp(),
                        -f64::from(model.cost)
                    )]
                )
                .await?;

            state
                .persistent_client
                .zincrby::<(), _, _>(
                    TEAM_LEADERBOARD,
                    f64::from(model.cost),
                    player_model.team_id.simple().to_string(),
                )
                .await?;
        }
    },
    on_update: {
        if model.cost != old_model.cost {
            for player_model in model.find_related(Player).all(&state.db_conn).await? {
                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        f64::from(model.cost - old_model.cost),
                        player_model.id.simple().to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        player_history_key(player_model.id),
                        vec![format!(
                            "{}:{}",
                            Utc::now().timestamp(),
                            f64::from(model.cost - old_model.cost),
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        TEAM_LEADERBOARD,
                        f64::from(model.cost - old_model.cost),
                        player_model.team_id.simple().to_string(),
                    )
                    .await?;
            }
        }
    }
);

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
    AuthPlayer(player_claims): AuthPlayer,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<HintModel>> {
    let txn = state.db_conn.begin().await?;

    if let Some((_, Some(hint_model))) = Unlock::find_by_id((player_claims.sub, id))
        .find_also_related(Hint)
        .one(&txn)
        .await?
    {
        return Ok(Json(hint_model));
    }

    UnlockModel::new(player_claims.sub, id)
        .into_active_model()
        .insert(&txn)
        .await?;

    let Some(hint_model) = Hint::find_by_id(id).one(&txn).await? else {
        return Err(Error::NotFound("Hint not found".to_owned()));
    };

    state
        .persistent_client
        .zincrby::<(), _, _>(
            PLAYER_LEADERBOARD,
            -f64::from(hint_model.cost),
            &player_claims.sub.simple().to_string(),
        )
        .await?;

    state
        .persistent_client
        .lpush::<(), _, _>(
            player_history_key(player_claims.sub),
            vec![format!(
                "{}:{}",
                Utc::now().timestamp(),
                -f64::from(hint_model.cost)
            )],
        )
        .await?;

    state
        .persistent_client
        .zincrby::<(), _, _>(
            TEAM_LEADERBOARD,
            -f64::from(hint_model.cost),
            &player_claims.team_id.simple().to_string(),
        )
        .await?;

    Ok(Json(hint_model))
}
