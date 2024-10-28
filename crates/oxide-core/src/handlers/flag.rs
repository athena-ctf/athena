use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use oxide_macros::{crud_interface_api, optional_relation_api, single_relation_api};
use sea_orm::{ActiveModelTrait, ActiveValue, EntityTrait, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    ChallengeModel, CreateFlagSchema, FlagModel, FlagVerificationResult, PlayerModel, Submission,
    CreateSubmissionSchema, TokenClaims, VerifyFlagSchema,
};
use crate::service::AppState;

crud_interface_api!(Flag);

optional_relation_api!(Flag, Player);
single_relation_api!(Flag, Challenge);

#[utoipa::path(
    post,
    path = "/player/flag/verify",
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
) -> Result<Json<FlagVerificationResult>> {
    let Some(player_model) = db::player::retrieve(
        claims.id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("Player does not exist".to_owned()));
    };

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
            .ctf
            .challenge
            .as_ref()
            .is_some_and(|limit| submission_model.flags.len() == limit.max_attempts)
        {
            return Err(Error::BadRequest("submission limit reached".to_string()));
        }

        Some(submission_model)
    } else {
        None
    };

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
        active_model.update(&state.db_conn).await?;
    }

    if let Some(mut submission_model) = prev_model {
        submission_model.flags.push(body.flag);
        submission_model
            .into_active_model()
            .update(&state.db_conn)
            .await?;
    } else {
        db::submission::create(
            CreateSubmissionSchema {
                player_id: player_model.id,
                challenge_id: body.challenge_id,
                is_correct,
                flags: vec![body.flag],
            },
            &state.db_conn,
        )
        .await?;
    }

    Ok(Json(FlagVerificationResult { is_correct }))
}
