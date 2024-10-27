use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use oxide_macros::{crud_interface_api, multiple_relation_with_model_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementModel, ChallengeDetails, ChallengeModel, ChallengeSummary, ChallengeTagModel,
    DetailedChallenge, FileModel, HintModel, InstanceModel, SubmissionModel, TagModel, TokenClaims,
};
use crate::service::AppState;

crud_interface_api!(Challenge);

multiple_relation_with_model_api!(Challenge, Achievement);
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
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No challenge found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// List challenge summary by id
pub async fn player_challenges(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
) -> Result<Json<Vec<ChallengeSummary>>> {
    db::challenge::list_summaries(claims.id, &state.db_conn)
        .await
        .map(Json)
}

#[axum::debug_handler]
#[utoipa::path(
    get,
    path = "/player/challenge/details/{id}",
    responses(
        (status = 200, description = "Retrieved player challenge details successfully", body = DetailedChallenge),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No challenge found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Retrieve challenge details by id
pub async fn detailed_challenge(
    Path(id): Path<Uuid>,
    state: State<Arc<AppState>>,
) -> Result<Json<DetailedChallenge>> {
    Ok(Json(
        db::challenge::detailed_challenge(id, &state.db_conn).await?,
    ))
}
