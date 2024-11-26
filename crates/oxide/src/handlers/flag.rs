use std::sync::LazyLock;

use chrono::Utc;
use dashmap::DashMap;
use regex::Regex;
use sea_orm::sea_query::OnConflict;
use sea_orm::{Iterable, TransactionTrait};

use crate::jwt::AuthPlayer;
use crate::redis_keys::{
    player_history_key, CHALLENGE_SOLVES, PLAYER_LEADERBOARD, TEAM_LEADERBOARD,
};
use crate::schemas::{
    Award, Challenge, ChallengeKindEnum, ChallengeModel, CreateFlagSchema, Flag, FlagModel,
    FlagVerificationResult, JsonResponse, Player, PlayerAward, PlayerAwardModel, PlayerModel,
    Submission, SubmissionModel, VerifyFlagSchema,
};

oxide_macros::crud!(Flag, single: [Challenge], optional: [Player], multiple: []);

static REGEX_CACHE: LazyLock<DashMap<Uuid, Arc<Regex>>> = LazyLock::new(DashMap::new);

#[utoipa::path(
    post,
    path = "/player/flag/verify",
    request_body = VerifyFlagSchema,
    operation_id = "verify_flag",
    responses(
        (status = 200, description = "Verified flag successfully", body = FlagVerificationResult),
        (status = 400, description = "Invalid request body format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Verify flag
pub async fn verify(
    AuthPlayer(player_claimd): AuthPlayer,
    state: State<Arc<AppState>>,
    Json(body): Json<VerifyFlagSchema>,
) -> Result<Json<FlagVerificationResult>> {
    let txn = state.db_conn.begin().await?;

    let prev_model = if let Some(submission_model) =
        Submission::find_by_id((body.challenge_id, player_claimd.sub))
            .one(&state.db_conn)
            .await?
    {
        if submission_model.is_correct {
            return Err(Error::BadRequest("flag already submitted".to_owned()));
        } else if state
            .settings
            .read()
            .await
            .challenge
            .max_attempts
            .is_some_and(|max_attempts| submission_model.flags.len() == max_attempts)
        {
            return Err(Error::BadRequest("submission limit reached".to_string()));
        }

        Some(submission_model)
    } else {
        None
    };

    let Some(challenge_model) = Challenge::find_by_id(body.challenge_id)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Challenge".to_owned()));
    };

    let points = challenge_model.points;

    let is_correct = match challenge_model.kind {
        ChallengeKindEnum::StaticFlag => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .one(&state.db_conn)
                .await?
            else {
                return Err(Error::NotFound("Flag".to_owned()));
            };

            if flag_model.ignore_case {
                flag_model.value.to_lowercase() == body.flag.to_lowercase()
            } else {
                flag_model.value == body.flag
            }
        }

        ChallengeKindEnum::RegexFlag => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .one(&state.db_conn)
                .await?
            else {
                return Err(Error::NotFound("Flag".to_owned()));
            };

            let regex = REGEX_CACHE.get(&flag_model.id);

            if let Some(regex) = regex {
                regex.is_match(&body.flag)
            } else {
                let regex = if flag_model.ignore_case {
                    Regex::new(&format!("(?i){}", flag_model.value))?
                } else {
                    Regex::new(&flag_model.value)?
                };

                let is_match = regex.is_match(&body.flag);
                REGEX_CACHE.insert(flag_model.id, Arc::new(regex));

                is_match
            }
        }

        ChallengeKindEnum::Containerized => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .filter(entity::flag::Column::PlayerId.eq(player_claimd.sub))
                .one(&state.db_conn)
                .await?
            else {
                return Err(Error::NotFound("Flag is not generated".to_owned()));
            };

            flag_model.value == body.flag
        }
    };

    if is_correct {
        state
            .persistent_client
            .zincrby::<(), _, _>(
                PLAYER_LEADERBOARD,
                f64::from(points),
                &player_claimd.sub.to_string(),
            )
            .await?;

        state
            .persistent_client
            .lpush::<(), _, _>(
                player_history_key(player_claimd.sub),
                vec![format!("{}:{}", Utc::now().timestamp(), f64::from(points))],
            )
            .await?;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                TEAM_LEADERBOARD,
                f64::from(points),
                &player_claimd.team_id.to_string(),
            )
            .await?;

        let solves = state
            .persistent_client
            .hincrby::<u64, _, _>(CHALLENGE_SOLVES, challenge_model.id.to_string(), 1)
            .await?;

        let award_model = match solves {
            1 => Some(
                Award::find()
                    .filter(entity::award::Column::Value.eq("First Blood"))
                    .one(&txn)
                    .await?
                    .unwrap(),
            ),

            2 => Some(
                Award::find()
                    .filter(entity::award::Column::Value.eq("Second Blood"))
                    .one(&txn)
                    .await?
                    .unwrap(),
            ),

            3 => Some(
                Award::find()
                    .filter(entity::award::Column::Value.eq("Third Blood"))
                    .one(&txn)
                    .await?
                    .unwrap(),
            ),
            _ => None,
        };

        if let Some(award_model) = award_model {
            PlayerAward::insert(
                PlayerAwardModel::new(player_claimd.sub, award_model.id, 1).into_active_model(),
            )
            .on_conflict(
                OnConflict::columns(entity::player_award::PrimaryKey::iter())
                    .update_column(entity::player_award::Column::Count)
                    .value(
                        entity::player_award::Column::Count,
                        Expr::col(entity::player_award::Column::Count).add(1),
                    )
                    .to_owned(),
            )
            .exec(&txn)
            .await?;
        }
    }

    if let Some(mut submission_model) = prev_model {
        submission_model.flags.push(body.flag);
        submission_model.into_active_model().update(&txn).await?;
    } else {
        SubmissionModel::new(
            is_correct,
            player_claimd.sub,
            body.challenge_id,
            vec![body.flag],
        )
        .into_active_model()
        .insert(&txn)
        .await?;
    }

    txn.commit().await?;

    Ok(Json(FlagVerificationResult { is_correct }))
}
