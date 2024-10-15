use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::{
    delete_api, list_api, multiple_relation_with_model_api, retrieve_api, update_api,
};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    AchievementModel, ChallengeDetails, ChallengeModel, ChallengeRelations, ChallengeSolves,
    ChallengeTagDetails, ChallengeTagModel, CreateChallengeSchema, FileModel, HintModel,
    InstanceModel, SubmissionModel, TagDetails, TagModel,
};
use crate::service::AppState;

list_api!(Challenge);
retrieve_api!(Challenge);
delete_api!(Challenge);
update_api!(Challenge);

multiple_relation_with_model_api!(Challenge, Achievement);
multiple_relation_with_model_api!(Challenge, File);
multiple_relation_with_model_api!(Challenge, Hint);
multiple_relation_with_model_api!(Challenge, Instance);
multiple_relation_with_model_api!(Challenge, Tag);
multiple_relation_with_model_api!(Challenge, Submission);
multiple_relation_with_model_api!(Challenge, ChallengeTag);

#[utoipa::path(
    post,
    path = "/challenge",
    operation_id = "create_challenge",
    request_body(content_type = "multipart/form-data", content = CreateChallengeSchema),
    responses(
        (status = 201, description = "Created challenge successfully", body = ChallengeModel),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Create challenge
pub async fn create(
    state: State<Arc<AppState>>,
    Json(body): Json<CreateChallengeSchema>,
) -> Result<Json<ChallengeModel>> {
    let chall = db::challenge::create(
        ChallengeDetails {
            author_name: body.author_name.clone(),
            description: body.description.clone(),
            difficulty: body.difficulty,
            points: body.points,
            status: body.status,
            title: body.title.clone(),
            container_meta: body.container_meta,
            flag_type: body.flag_type,
        },
        &state.db_conn,
    )
    .await?;

    for tag_value in body.tags.clone() {
        let tag_id = if let Some(tag_model) =
            db::tag::retrieve_by_value(&tag_value, &state.db_conn).await?
        {
            tag_model.id
        } else {
            db::tag::create(TagDetails { value: tag_value }, &state.db_conn)
                .await?
                .id
        };

        db::challenge_tag::create(
            ChallengeTagDetails {
                challenge_id: chall.id,
                tag_id,
            },
            &state.db_conn,
        )
        .await?;
    }

    Ok(Json(chall))
}

#[utoipa::path(
    get,
    path = "/challenge/{id}/solves",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Calculates challenge solves by id successfully", body = ChallengeSolves),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No challenge found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Calculate challenge solves by id
pub async fn calculate_solves_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<ChallengeSolves>> {
    Ok(Json(ChallengeSolves {
        solves: db::challenge::calculate_solves(id, &state.db_conn).await?,
    }))
}

#[utoipa::path(
    get,
    path = "/challenge/{id}/relations",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Retrieved challenge relations by id successfully", body = ChallengeRelations),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No challenge found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Retrieve challenge relations by id
pub async fn retrieve_relations_by_id(
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<ChallengeRelations>> {
    let Some(challenge) = db::challenge::retrieve(
        id,
        &state.db_conn,
        &mut state.cache_client.get().await.unwrap(),
    )
    .await?
    else {
        return Err(Error::NotFound("Challenge does not exist".to_owned()));
    };

    let tags = db::challenge::related_tags(&challenge, &state.db_conn).await?;
    let files = db::challenge::related_files(&challenge, &state.db_conn).await?;
    let hints = db::challenge::related_hint_summaries(&challenge, &state.db_conn).await?;

    let solves = db::challenge::calculate_solves(id, &state.db_conn).await?;

    Ok(Json(ChallengeRelations {
        challenge,
        files,
        hints,
        tags,
        solves,
    }))
}
