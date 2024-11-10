use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use oxide_macros::table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel, Iterable, QueryOrder, QuerySelect};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Achievement, AchievementModel, AuthPlayer, Challenge, ChallengeModel, ChallengeSummary,
    ChallengeTag, ChallengeTagModel, Container, ContainerModel, CreateChallengeSchema, Deployment,
    DeploymentModel, DetailedChallenge, File, FileModel, Flag, FlagModel, Hint, HintModel,
    HintSummary, JsonResponse, Player, PlayerChallengeState, PlayerModel, Submission,
    SubmissionModel, Tag, TagModel, Unlock, UnlockModel, UnlockStatus,
};
use crate::service::{AppState, CachedJson};

table_api!(Challenge, single: [], optional: [], multiple: [Achievement, Container, File, Hint, Deployment, Tag, Submission, ChallengeTag, Flag, Player]);

#[utoipa::path(
    get,
    path = "/player/challenges",
    responses(
        (status = 200, description = "Listed player challenges successfully", body = [ChallengeSummary]),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No challenge found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// List challenge summary by id
pub async fn player_challenges(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<Json<Vec<ChallengeSummary>>> {
    let challenges = Challenge::find().all(&state.db_conn).await?;
    let submissions = Submission::find()
        .select_only()
        .columns([
            entity::submission::Column::ChallengeId,
            entity::submission::Column::Flags,
            entity::submission::Column::IsCorrect,
        ])
        .filter(entity::submission::Column::PlayerId.eq(player.id))
        .order_by_asc(entity::submission::Column::ChallengeId)
        .into_tuple::<(Uuid, Vec<String>, bool)>()
        .all(&state.db_conn)
        .await?;

    let mut summaries = Vec::with_capacity(challenges.len());
    for challenge in challenges {
        let tags = challenge.find_related(Tag).all(&state.db_conn).await?;
        let max_attempts = state.settings.read().await.challenge.max_attempts;

        let state = submissions
            .binary_search_by_key(&challenge.id, |(id, ..)| *id)
            .ok()
            .map_or(PlayerChallengeState::ChallengeLimitReached, |idx: usize| {
                let (_, flags, is_correct) = &submissions[idx];

                if *is_correct {
                    PlayerChallengeState::Solved
                } else if max_attempts.is_some_and(|max_attempts| flags.len() == max_attempts) {
                    PlayerChallengeState::ChallengeLimitReached
                } else {
                    PlayerChallengeState::Unsolved
                }
            });

        summaries.push(ChallengeSummary {
            challenge,
            tags,
            state,
        });
    }

    Ok(Json(summaries))
}

#[utoipa::path(
    get,
    path = "/player/challenge/details/{id}",
    params(
        ("id" = Uuid, Path, description = "The id of the challenge")
    ),
    responses(
        (status = 200, description = "Retrieved player challenge details successfully", body = DetailedChallenge),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No challenge found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve challenge details by id
pub async fn detailed_challenge(
    AuthPlayer(player): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<DetailedChallenge>> {
    let hints = Hint::find()
        .find_also_related(Unlock)
        .select_only()
        .columns(entity::hint::Column::iter())
        .columns(entity::unlock::Column::iter())
        .filter(entity::hint::Column::ChallengeId.eq(id))
        .filter(entity::unlock::Column::PlayerId.eq(player.id))
        .into_model::<HintModel, UnlockModel>()
        .all(&state.db_conn)
        .await?
        .into_iter()
        .map(|(hint, unlock)| HintSummary {
            id: hint.id,
            cost: hint.cost,
            status: if unlock.is_some() {
                UnlockStatus::Unlocked {
                    value: hint.description,
                }
            } else {
                UnlockStatus::Locked
            },
        })
        .collect();

    Ok(Json(DetailedChallenge {
        files: File::find()
            .filter(entity::file::Column::ChallengeId.eq(id))
            .all(&state.db_conn)
            .await?,
        hints,
    }))
}

#[utoipa::path(
    get,
    path = "/player/challenge/start/{id}",
    params(
        ("id" = Uuid, Path, description = "The id of the challenge")
    ),
    responses(
        (status = 200, description = "Started challenge containers successfully", body = DeploymentModel),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No challenge found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Start challenge containers by id
pub async fn start_challenge(
    AuthPlayer(player): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<DeploymentModel>> {
    state
        .docker_manager
        .deploy_challenge(id, player.id)
        .await
        .map(Json)
}

#[utoipa::path(
    get,
    path = "/player/challenge/stop/{id}",
    params(
        ("id" = Uuid, Path, description = "The id of the challenge")
    ),
    responses(
        (status = 200, description = "Stopped challenge containers successfully"),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No challenge found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Stop challenge containers by id
pub async fn stop_challenge(
    AuthPlayer(player): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<()> {
    state.docker_manager.cleanup_challenge(id, player.id).await
}
