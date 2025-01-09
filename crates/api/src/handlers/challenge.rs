use std::collections::HashMap;
use std::time::Duration;

use chrono::Utc;
use entity::extensions::{InvalidAction, RequirementKind};
use entity::prelude::ChallengeKindEnum;
use sea_orm::{Iterable, QueryFilter, QueryOrder, QuerySelect};
use tokio_cron_scheduler::Job;

use crate::jwt::AuthPlayer;
use crate::redis_keys::CHALLENGE_SOLVES;
use crate::schemas::{
    ChallengeInstance, ChallengeSummary, DeploymentModel, DetailedChallenge, HintModel, HintSummary, Instance,
    PlayerChallenge, PlayerChallengeState, PlayerChallenges, Unlock, UnlockModel, UnlockStatus,
};

api_macros::crud!(
    Challenge,
    single: [],
    optional: [],
    multiple: [Container, File, Hint, Deployment, Submission, ChallengeFile, Flag, Player]
);

#[utoipa::path(
    get,
    path = "/player/challenges",
    responses(
        (status = 200, body = PlayerChallenges),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn player_challenges(
    AuthPlayer(player): AuthPlayer,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<PlayerChallenges>>> {
    let challenges = Challenge::find()
        .filter(entity::challenge::Column::State.ne(entity::sea_orm_active_enums::StateEnum::Hidden))
        .all(&state.db_conn)
        .await?;
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
        let mut player_state = submissions
            .binary_search_by_key(&challenge.id, |(id, ..)| *id)
            .ok()
            .map_or(PlayerChallengeState::Unsolved, |idx: usize| {
                let (_, flags, is_correct) = &submissions[idx];

                if *is_correct {
                    PlayerChallengeState::Solved
                } else if challenge
                    .max_attempts
                    .is_some_and(|max_attempts| flags.len() as i32 == max_attempts)
                {
                    PlayerChallengeState::ChallengeLimitReached
                } else {
                    PlayerChallengeState::Unsolved
                }
            });

        let deployment = if challenge.kind == ChallengeKindEnum::DynamicContainerized {
            Deployment::find()
                .filter(entity::deployment::Column::ChallengeId.eq(challenge.id))
                .filter(entity::deployment::Column::PlayerId.eq(player.sub))
                .one(&state.db_conn)
                .await?
        } else {
            None
        };

        if let Some(ref requirements) = challenge.requirements {
            let (rank, score) = state.leaderboard_manager.player_rank(player.sub).await?;
            let now = Utc::now();

            let satisfied = match requirements.kind {
                RequirementKind::MinScore { score: min_score } => score as u64 >= min_score,
                RequirementKind::MaxScore { score: max_score } => score as u64 <= max_score,
                RequirementKind::MinRank { rank: min_rank } => rank >= min_rank,
                RequirementKind::AfterTime { time } => time <= now,
                RequirementKind::BeforeTime { time } => time >= now,
                RequirementKind::DuringTime { start, end } => start <= now && now <= end,
            };

            if !satisfied {
                match requirements.invalid_action {
                    InvalidAction::Hide => continue,
                    InvalidAction::Disable => player_state = PlayerChallengeState::Disabled,
                }
            }
        }

        summaries.push((challenge.grouping.clone(), ChallengeSummary {
            challenge,
            state: player_state,
            deployment,
            attempts: submissions.len(),
        }));
    }

    struct Accumulator {
        group_indices: HashMap<String, usize>,
        player_challenges: Vec<PlayerChallenge>,
    }

    Ok(ApiResponse::json_ok(PlayerChallenges {
        challenges: summaries
            .into_iter()
            .fold(
                Accumulator {
                    group_indices: HashMap::new(),
                    player_challenges: Vec::new(),
                },
                |mut acc, (grouping, challenge_summary)| {
                    if let Some(grouping) = grouping {
                        if let Some(idx) = acc.group_indices.get(&grouping.name) {
                            match &mut acc.player_challenges[*idx] {
                                PlayerChallenge::Group { group: _, summaries } => {
                                    summaries.push(challenge_summary);
                                }
                                PlayerChallenge::Single { .. } => unreachable!(),
                            }
                        } else {
                            acc.group_indices
                                .insert(grouping.name.clone(), acc.player_challenges.len());
                            acc.player_challenges.push(PlayerChallenge::Group {
                                group: grouping,
                                summaries: vec![challenge_summary],
                            });
                        }
                    } else {
                        acc.player_challenges.push(PlayerChallenge::Single {
                            summary: challenge_summary,
                        });
                    }

                    acc
                },
            )
            .player_challenges,
    }))
}

#[utoipa::path(
    get,
    path = "/player/challenge/details/{id}",
    params(
        ("id" = Uuid, Path)
    ),
    responses(
        (status = 200, body = DetailedChallenge),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn detailed_challenge(
    AuthPlayer(player): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<DetailedChallenge>>> {
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

        for instance_model in deployment_model.find_related(Instance).all(&state.db_conn).await? {
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

    let solves = state.redis_client.hget(CHALLENGE_SOLVES, id.to_string()).await?;

    Ok(ApiResponse::json_ok(DetailedChallenge {
        files: File::find()
            .inner_join(ChallengeFile)
            .filter(entity::challenge_file::Column::ChallengeId.eq(id))
            .all(&state.db_conn)
            .await?,
        hints,
        instances,
        solves,
    }))
}

#[utoipa::path(
    get,
    path = "/player/challenge/start/{id}",
    params(
        ("id" = Uuid, Path)
    ),
    responses(
        (status = 200, body = DeploymentModel),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn start_challenge(
    AuthPlayer(player_claims): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<DeploymentModel>>> {
    let Some(challenge_model) = Challenge::find_by_id(id).one(&state.db_conn).await? else {
        return Err(Error::NotFound("Challenge not found".to_owned()));
    };

    let deployment_model = state
        .docker_manager
        .deploy_challenge(&challenge_model, Some(player_claims.sub))
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
                        .cleanup_challenge(challenge_id, Some(player_id))
                        .await
                        .unwrap();
                })
            },
        )?)
        .await?;

    Ok(ApiResponse::json_ok(deployment_model))
}

#[utoipa::path(
    get,
    path = "/player/challenge/stop/{id}",
    params(
        ("id" = Uuid, Path)
    ),
    responses(
        (status = 200, body = JsonResponse),
        (status = 400, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn stop_challenge(
    AuthPlayer(player_claims): AuthPlayer,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    state
        .docker_manager
        .cleanup_challenge(id, Some(player_claims.sub))
        .await?;

    Ok(ApiResponse::json_ok(JsonResponse {
        message: "successfully stopped challenge deployment".to_owned(),
    }))
}
