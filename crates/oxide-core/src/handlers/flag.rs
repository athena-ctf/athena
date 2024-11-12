use std::sync::{Arc, LazyLock};

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use dashmap::DashMap;
use fred::prelude::*;
use regex::Regex;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, TransactionTrait};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    AuthPlayer, Challenge, ChallengeModel, ChallengeTypeEnum, CreateFlagSchema, Flag, FlagModel,
    FlagVerificationResult, JsonResponse, Player, PlayerModel, Submission, SubmissionModel,
    VerifyFlagSchema,
};
use crate::service::{AppState, CachedJson};

oxide_macros::derive::crud!(Flag, single: [Challenge], optional: [Player], multiple: []);

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
    AuthPlayer(player_model): AuthPlayer,
    state: State<Arc<AppState>>,
    Json(body): Json<VerifyFlagSchema>,
) -> Result<Json<FlagVerificationResult>> {
    let txn = state.db_conn.begin().await?;

    let prev_model = if let Some(submission_model) =
        Submission::find_by_id((body.challenge_id, player_model.id))
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

    let Some(mut challenge_model) = Challenge::find_by_id(body.challenge_id)
        .one(&state.db_conn)
        .await?
    else {
        return Err(Error::NotFound("Challenge".to_owned()));
    };

    let points = challenge_model.points;

    let is_correct = match challenge_model.challenge_type {
        ChallengeTypeEnum::StaticFlag => {
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

        ChallengeTypeEnum::RegexFlag => {
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

        ChallengeTypeEnum::Containerized => {
            let Some(flag_model) = Flag::find()
                .filter(entity::flag::Column::ChallengeId.eq(body.challenge_id))
                .filter(entity::flag::Column::PlayerId.eq(player_model.id))
                .one(&state.db_conn)
                .await?
            else {
                return Err(Error::NotFound("Flag is not generated".to_owned()));
            };

            flag_model.value == body.flag
        }
    };

    if is_correct {
        challenge_model.solves += 1;
        challenge_model.into_active_model().save(&txn).await?;

        let mut player_model_cloned = player_model.clone();
        player_model_cloned.score += points;

        state
            .persistent_client
            .zincrby::<(), _, _>(
                "leaderboard",
                f64::from(points),
                &player_model.id.simple().to_string(),
            )
            .await?;

        let active_model = player_model_cloned.into_active_model();
        active_model.update(&txn).await?;
    }

    if let Some(mut submission_model) = prev_model {
        submission_model.flags.push(body.flag);
        submission_model.into_active_model().update(&txn).await?;
    } else {
        SubmissionModel::new(
            is_correct,
            player_model.id,
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
