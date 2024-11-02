use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use chrono::{Duration, Utc};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, multiple_relation_with_model_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementModel, ChallengeDeployment, ChallengeModel, ChallengeSummary, ChallengeTagModel,
    ContainerModel, CreateChallengeSchema, DetailedChallenge, FileModel, HintModel, InstanceModel,
    JsonResponse, SubmissionModel, TagModel, TokenClaims,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Challenge);

multiple_relation_with_model_api!(Challenge, Achievement);
multiple_relation_with_model_api!(Challenge, Container);
multiple_relation_with_model_api!(Challenge, File);
multiple_relation_with_model_api!(Challenge, Hint);
multiple_relation_with_model_api!(Challenge, Instance);
multiple_relation_with_model_api!(Challenge, Tag);
multiple_relation_with_model_api!(Challenge, Submission);
multiple_relation_with_model_api!(Challenge, ChallengeTag);

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
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<Vec<ChallengeSummary>>> {
    db::challenge::list_summaries(
        claims.id,
        state.settings.read().await.challenge.max_attempts,
        &state.db_conn,
    )
    .await
    .map(Json)
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
    Extension(claims): Extension<TokenClaims>,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<DetailedChallenge>> {
    Ok(Json(
        db::challenge::detailed_challenge(claims.id, id, &state.db_conn).await?,
    ))
}

#[utoipa::path(
    get,
    path = "/player/challenge/start/{id}",
    params(
        ("id" = Uuid, Path, description = "The id of the challenge")
    ),
    responses(
        (status = 200, description = "Started challenge containers successfully", body = ChallengeDeployment),
        (status = 400, description = "Invalid parameters format", body = JsonResponse),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 404, description = "No challenge found with specified id", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Start challenge containers by id
pub async fn start_challenge(
    Extension(claims): Extension<TokenClaims>,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<ChallengeDeployment>> {
    let Some(challenge_model) = crate::db::challenge::retrieve(id, &state.db_conn).await? else {
        return Err(Error::NotFound("Challenge not found".to_owned()));
    };
    let container_models =
        crate::db::challenge::related_containers(&challenge_model, &state.db_conn).await?;

    let (subdomain, port_bindings) = state
        .docker_manager
        .deploy_challenge(challenge_model, container_models, claims.id)
        .await?;

    Ok(Json(ChallengeDeployment {
        expires_at: Utc::now() + Duration::seconds(state.docker_manager.container_timeout),
        subdomain,
        port_bindings,
    }))
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
    Extension(claims): Extension<TokenClaims>,
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<()> {
    state
        .docker_manager
        .cleanup_challenge(id, claims.id)
        .await?;

    Ok(())
}
