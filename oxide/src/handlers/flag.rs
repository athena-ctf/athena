use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use chrono::Utc;
use sea_orm::{ActiveModelTrait, ActiveValue, EntityTrait, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::AthenaError;
use crate::macros::api::{crud_interface, optional_relation, single_relation};
use crate::schemas::{
    ChallengeModel, FlagDetails, FlagModel, FlagVerificationResult, PlayerModel, Submission,
    SubmissionModel, TokenClaims, VerifyFlagSchema,
};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Flag);

optional_relation!(Flag, Player);
single_relation!(Flag, Challenge);

#[utoipa::path(
    post,
    path = "/flag/verify",
    request_body = VerifyFlagSchema,
    responses(
        (status = 201, description = "Verified flag successfully", body = FlagVerificationResult),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Verify flag
pub async fn verify(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Json(body): Json<VerifyFlagSchema>,
) -> ApiResult<Json<FlagVerificationResult>> {
    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(ApiError::NotFound("Player does not exist".to_owned()));
    };

    // TODO: add submission limit
    if let Some(SubmissionModel {
        is_correct: true, ..
    }) = Submission::find_by_id((body.challenge_id, player_model.id))
        .one(&state.db_conn)
        .await
        .map_err(AthenaError::from)?
    {
        return Err(ApiError::BadRequest("flag already submitted".to_owned()));
    }

    let (is_correct, points) = db::flag::verify(
        player_model.id,
        body.challenge_id,
        body.flag.clone(),
        &state.db_conn,
    )
    .await?;

    if is_correct {
        let player_model_cloned = player_model.clone();
        let mut active_model = player_model_cloned.into_active_model();

        active_model.score = ActiveValue::Set(player_model.score + points);

        active_model
            .update(&state.db_conn)
            .await
            .map_err(AthenaError::from)?;
    }

    Submission::insert(
        SubmissionModel {
            player_id: player_model.id,
            challenge_id: body.challenge_id,
            flag: body.flag,
            is_correct,
            date_created: Utc::now().naive_utc(),
        }
        .into_active_model(),
    )
    .exec(&state.db_conn)
    .await
    .map_err(AthenaError::from)?;

    Ok(Json(FlagVerificationResult { is_correct }))
}
