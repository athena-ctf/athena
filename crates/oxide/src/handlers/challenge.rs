use std::time::Duration;

use chrono::Utc;
use sea_orm::{Iterable, QueryFilter, QueryOrder, QuerySelect};
use tokio_cron_scheduler::Job;

use crate::jwt::AuthPlayer;
use crate::redis_keys::{
    player_history_key, CHALLENGE_SOLVES, PLAYER_LEADERBOARD, TEAM_LEADERBOARD,
};
use crate::schemas::{
    Challenge, ChallengeFile, ChallengeFileModel, ChallengeInstance, ChallengeKindEnum,
    ChallengeModel, ChallengeSummary, ChallengeTag, ChallengeTagModel, Container, ContainerModel,
    CreateChallengeSchema, Deployment, DeploymentModel, DetailedChallenge, File, FileModel, Flag,
    FlagModel, Hint, HintModel, HintSummary, Instance, JsonResponse, Player, PlayerChallengeState,
    PlayerChallenges, PlayerModel, Submission, SubmissionModel, Tag, TagModel, Unlock, UnlockModel,
    UnlockStatus,
};

oxide_macros::crud!(
    Challenge,
    single: [],
    optional: [],
    multiple: [Container, File, Hint, Deployment, Tag, Submission, ChallengeTag, ChallengeFile, Flag, Player],
    on_delete: {
        for player_model in model.find_related(Player).all(&state.db_conn).await? {
            state
                .persistent_client
                .zincrby::<(), _, _>(
                    PLAYER_LEADERBOARD,
                    -f64::from(model.points),
                    player_model.id.to_string()
                )
                .await?;

            state
                .persistent_client
                .lpush::<(), _, _>(
                    player_history_key(player_model.id),
                    vec![format!(
                        "{}:{}",
                        Utc::now().timestamp(),
                        -f64::from(model.points)
                    )]
                )
                .await?;

            state
                .persistent_client
                .zincrby::<(), _, _>(
                    TEAM_LEADERBOARD,
                    -f64::from(model.points),
                    player_model.team_id.to_string(),
                )
                .await?;
        }
    },
    on_update: {
        if model.points != old_model.points {
            for player_model in model.find_related(Player).all(&state.db_conn).await? {
                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        PLAYER_LEADERBOARD,
                        f64::from(model.points - old_model.points),
                        player_model.id.to_string()
                    )
                    .await?;

                state
                    .persistent_client
                    .lpush::<(), _, _>(
                        player_history_key(player_model.id),
                        vec![format!(
                            "{}:{}",
                            Utc::now().timestamp(),
                            f64::from(model.points - old_model.points)
                        )]
                    )
                    .await?;

                state
                    .persistent_client
                    .zincrby::<(), _, _>(
                        TEAM_LEADERBOARD,
                        f64::from(model.points - old_model.points),
                        player_model.team_id.to_string(),
                    )
                    .await?;
            }
        }
    }
);

#[utoipa::path(
    get,
    path = "/player/challenges",
    responses(
        (status = 200, description = "Listed player challenges successfully", body = PlayerChallenges),
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
) -> Result<Json<PlayerChallenges>> {
    let challenges = Challenge::find().all(&state.db_conn).await?;
    let submissions = Submission::find()
        .select_only()
        .columns([
            entity::submission::Column::ChallengeId,
            entity::submission::Column::Flags,
            entity::submission::Column::IsCorrect,
        ])
        .filter(entity::submission::Column::PlayerId.eq(player.sub))
        .order_by_asc(entity::submission::Column::ChallengeId)
        .into_tuple::<(Uuid, Vec<String>, bool)>()
        .all(&state.db_conn)
        .await?;

    let mut summaries = Vec::with_capacity(challenges.len());
    for challenge in challenges {
        let tags = challenge.find_related(Tag).all(&state.db_conn).await?;
        let max_attempts = state.settings.read().await.challenge.max_attempts;

        let player_state = submissions
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

        let deployment = if challenge.kind == ChallengeKindEnum::Containerized {
            Deployment::find()
                .filter(entity::deployment::Column::ChallengeId.eq(challenge.id))
                .filter(entity::deployment::Column::PlayerId.eq(player.sub))
                .one(&state.db_conn)
                .await?
        } else {
            None
        };

        let solves = state
            .persistent_client
            .hget(CHALLENGE_SOLVES, challenge.id.to_string())
            .await?;

        summaries.push(ChallengeSummary {
            challenge,
            tags,
            state: player_state,
            deployment,
            solves,
        });
    }

    Ok(Json(PlayerChallenges {
        summaries,
        tags: Tag::find().all(&state.db_conn).await?,
    }))
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
        .filter(entity::unlock::Column::PlayerId.eq(player.sub))
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

    let instances = if let Some(deployment_model) = Deployment::find()
        .filter(entity::deployment::Column::PlayerId.eq(player.sub))
        .filter(entity::deployment::Column::ChallengeId.eq(id))
        .one(&state.db_conn)
        .await?
    {
        let mut instances = Vec::new();

        for instance_model in deployment_model
            .find_related(Instance)
            .all(&state.db_conn)
            .await?
        {
            instances.push(ChallengeInstance {
                state: state
                    .docker_manager
                    .get_container_status(&instance_model.container_id)
                    .await?
                    .into(),
                instance_model,
            });
        }

        Some(instances)
    } else {
        None
    };

    Ok(Json(DetailedChallenge {
        files: File::find()
            .inner_join(ChallengeFile)
            .filter(entity::challenge_file::Column::ChallengeId.eq(id))
            .all(&state.db_conn)
            .await?,
        hints,
        instances,
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
    AuthPlayer(player_claims): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<DeploymentModel>> {
    let deployment_model = state
        .docker_manager
        .deploy_challenge(id, player_claims.sub)
        .await?;

    let state_cloned = state.clone();

    state
        .scheduler
        .add(Job::new_one_shot_async(
            Duration::from_secs(state.settings.read().await.challenge.container_timeout),
            move |_uuid, _l| {
                let state_cloned = state_cloned.clone();
                let challenge_id = id;
                let player_id = player_claims.sub;

                Box::pin(async move {
                    state_cloned
                        .docker_manager
                        .cleanup_challenge(challenge_id, player_id)
                        .await
                        .unwrap();
                })
            },
        )?)
        .await?;

    Ok(Json(deployment_model))
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
    AuthPlayer(player_claims): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<()> {
    state
        .docker_manager
        .cleanup_challenge(id, player_claims.sub)
        .await
}
