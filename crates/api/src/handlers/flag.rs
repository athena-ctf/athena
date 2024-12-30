use std::sync::LazyLock;

use dashmap::DashMap;
use regex::Regex;
use sea_orm::sea_query::OnConflict;
use sea_orm::{Iterable, TransactionTrait};

use crate::jwt::AuthPlayer;
use crate::redis_keys::CHALLENGE_SOLVES;
use crate::schemas::{
    Award, ChallengeKindEnum, FlagVerificationResult, PlayerAward, PlayerAwardModel, Submission, SubmissionModel,
    VerifyFlagSchema,
};

api_macros::crud!(Flag, single: [Challenge], optional: [Player], multiple: []);

static REGEX_CACHE: LazyLock<DashMap<Uuid, Arc<Regex>>> = LazyLock::new(DashMap::new);

#[utoipa::path(
    post,
    path = "/player/flag/verify",
    request_body = VerifyFlagSchema,
    operation_id = "verify_flag",
    responses(
        (status = 200, body = FlagVerificationResult),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn verify(
    AuthPlayer(player_claims): AuthPlayer,
    state: State<Arc<AppState>>,
    Json(body): Json<VerifyFlagSchema>,
) -> Result<ApiResponse<Json<FlagVerificationResult>>> {
    let txn = state.db_conn.begin().await?;

    let prev_model = if let Some(submission_model) = Submission::find_by_id((body.challenge_id, player_claims.sub))
        .one(&state.db_conn)
        .await?
    {
        if submission_model.is_correct {
            return Err(Error::BadRequest("flag already submitted".to_owned()));
        }

        Some(submission_model)
    } else {
        None
    };

    let Some(challenge_model) = Challenge::find_by_id(body.challenge_id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Challenge".to_owned()));
    };

    if challenge_model.max_attempts.is_some_and(|max_attempts| {
        prev_model
            .as_ref()
            .is_some_and(|prev| prev.flags.len() as i32 == max_attempts)
    }) {
        return Err(Error::BadRequest("submission limit reached".to_string()));
    }

    let points = challenge_model.points;

    let is_correct = match challenge_model.kind {
        ChallengeKindEnum::StaticFlag | ChallengeKindEnum::StaticContainerized => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .one(&state.db_conn)
                .await?
            else {
                return Err(Error::NotFound("Flag not found".to_owned()));
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

        ChallengeKindEnum::DynamicContainerized => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .filter(entity::flag::Column::PlayerId.eq(player_claims.sub))
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
            .leaderboard_manager
            .update_player(player_claims.sub, points)
            .await?;

        state
            .leaderboard_manager
            .update_team(player_claims.team_id, points)
            .await?;

        let solves = state
            .redis_client
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
            PlayerAward::insert(PlayerAwardModel::new(player_claims.sub, award_model.id, 1).into_active_model())
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
        SubmissionModel::new(is_correct, player_claims.sub, body.challenge_id, vec![body.flag])
            .into_active_model()
            .insert(&txn)
            .await?;
    }

    txn.commit().await?;

    Ok(ApiResponse::json_ok(FlagVerificationResult { is_correct }))
}
