use sea_orm::TransactionTrait;

use crate::jwt::AuthPlayer;
use crate::schemas::UnlockModel;

api_macros::crud!(Hint, single: [Challenge], optional: [], multiple: [Unlock, Player]);

#[utoipa::path(
    get,
    path = "/player/hint/unlock/{id}",
    params(("id" = Uuid, Path)),
    responses(
        (status = 200, body = HintModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn unlock_by_id(
    AuthPlayer(player_claims): AuthPlayer,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<ApiResponse<Json<HintModel>>> {
    let txn = state.db_conn.begin().await?;

    if let Some((_, Some(hint_model))) = Unlock::find_by_id((player_claims.sub, id))
        .find_also_related(Hint)
        .one(&txn)
        .await?
    {
        return Ok(ApiResponse::json_ok(hint_model));
    }

    UnlockModel::new(player_claims.sub, id)
        .into_active_model()
        .insert(&txn)
        .await?;

    let Some(hint_model) = Hint::find_by_id(id).one(&txn).await? else {
        return Err(Error::NotFound("Hint not found".to_owned()));
    };

    state
        .leaderboard_manager
        .update_player(player_claims.sub, -hint_model.cost)
        .await?;

    state
        .leaderboard_manager
        .update_team(player_claims.team_id, -hint_model.cost)
        .await?;

    Ok(ApiResponse::json_ok(hint_model))
}
