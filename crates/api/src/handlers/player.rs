use std::collections::HashMap;

use sea_orm::{Iterable, QuerySelect};

use crate::jwt::AuthPlayer;
use crate::leaderboard;
use crate::redis_keys::PLAYER_LAST_UPDATED;
use crate::schemas::{AwardsReceived, PlayerDetails, PlayerProfile, TagSolves, UpdateProfileSchema};

api_macros::crud!(
    Player,
    single: [Team],
    optional: [Deployment, Ban],
    multiple: [Flag, Award, PlayerAward, Notification, Submission, Unlock, Challenge, Hint, Ticket]
);

pub async fn get_user_profile(
    player: PlayerModel,
    leaderboard_manager: &leaderboard::Manager,
    db: &DbConn,
) -> Result<PlayerProfile> {
    let (rank, score) = leaderboard_manager.player_rank(player.id).await?;

    let mut tags_map = Challenge::find()
        .select_only()
        .column(entity::challenge::Column::Tags)
        .into_tuple::<(Vec<String>,)>()
        .all(db)
        .await?
        .into_iter()
        .flat_map(|tags| {
            tags.0.into_iter().map(|tag| {
                (tag.clone(), TagSolves {
                    tag_value: tag,
                    solves: 0,
                })
            })
        })
        .collect::<HashMap<_, _>>();

    let solved_challenges = player
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?;

    for submitted_challenge in &solved_challenges {
        for tag in &submitted_challenge.tags {
            tags_map.get_mut(tag).unwrap().solves += 1;
        }
    }

    let awards = player
        .find_related(Award)
        .select_only()
        .columns(entity::award::Column::iter())
        .column(entity::player_award::Column::Count)
        .into_model::<AwardsReceived>()
        .all(db)
        .await?;

    let tag_solves = tags_map.values().cloned().collect();
    let history = leaderboard_manager.player_history(player.id).await?;

    Ok(PlayerProfile {
        player,
        solved_challenges,
        awards,
        tag_solves,
        rank,
        score,
        history,
    })
}

#[utoipa::path(
    get,
    path = "/player/{username}/profile",
    params(("username" = String, Path)),
    responses(
        (status = 200, body = PlayerProfile),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn retrieve_profile_by_username(
    state: State<Arc<AppState>>,
    Path(username): Path<String>,
) -> Result<ApiResponse<Json<PlayerProfile>>> {
    let Some(player_model) = Player::find()
        .filter(entity::player::Column::Username.eq(&username))
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    get_user_profile(player_model, &state.leaderboard_manager, &state.db_conn)
        .await
        .map(ApiResponse::json_ok)
}

#[utoipa::path(
    patch,
    path = "/player/update-profile",
    request_body = UpdateProfileSchema,
    operation_id = "update_player_profile",
    responses(
        (status = 200, body = PlayerModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update_profile_by_id(
    state: State<Arc<AppState>>,
    AuthPlayer(player_claims): AuthPlayer,
    Json(body): Json<UpdateProfileSchema>,
) -> Result<ApiResponse<Json<PlayerModel>>> {
    let mut active_player = body.into_active_model();
    active_player.id = ActiveValue::Set(player_claims.sub);

    let player_model = active_player.update(&state.db_conn).await?;

    state
        .redis_client
        .hset::<(), _, _>(
            PLAYER_LAST_UPDATED,
            (player_model.id.to_string(), player_model.updated_at.timestamp()),
        )
        .await?;

    Ok(ApiResponse::json_ok(player_model))
}

#[utoipa::path(
    get,
    path = "/player/summary",
    operation_id = "retrieve_player_summary",
    responses(
        (status = 200, body = PlayerDetails),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn retrieve_summary(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<PlayerDetails>>> {
    let Some(player_model) = Player::find_by_id(player.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(ApiResponse::json_ok(PlayerDetails {
        submissions: player_model.find_related(Submission).all(&state.db_conn).await?,
        unlocks: player_model.find_related(Unlock).all(&state.db_conn).await?,
        profile: get_user_profile(player_model, &state.leaderboard_manager, &state.db_conn).await?,
    }))
}

#[utoipa::path(
    get,
    path = "/player/current",
    operation_id = "player_get_current",
    responses(
        (status = 200, body = PlayerModel),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    ),
)]
pub async fn get_current_logged_in(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<PlayerModel>>> {
    let Some(model) = Player::find_by_id(player.sub).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Player not found".to_owned()));
    };

    Ok(ApiResponse::json_ok(model))
}
