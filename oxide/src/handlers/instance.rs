use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, single_relation};
use crate::schemas::{ChallengeModel, InstanceDetails, InstanceModel, PlayerModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Instance);

single_relation!(Instance, Challenge);
single_relation!(Instance, Player);

#[utoipa::path(
    post,
    path = "/instance/new",
    request_body = InstanceDetails,
    responses(
        (status = 201, description = "Created new instance successfully", body = InstanceModel),
        (status = 400, description = "Invalid request body format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "InstanceModel ID not found", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Create new instance
pub async fn create_new(
    state: State<Arc<AppState>>,
    Json(body): Json<InstanceDetails>,
) -> ApiResult<Json<InstanceModel>> {
    Ok(Json(
        db::instance::new(
            body,
            &state.docker_client,
            &state.db_conn,
            &mut state.redis_client.get().await.unwrap(),
        )
        .await?,
    ))
}

#[utoipa::path(
    delete,
    path = "/instance/{id}/destroy",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 204, description = "Destroyed instance by id successfully"),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No instance found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Destroy instance by id
pub async fn destroy(state: State<Arc<AppState>>, Path(id): Path<Uuid>) -> ApiResult<()> {
    if db::instance::destroy(
        id,
        &state.docker_client,
        &state.db_conn,
        &mut state.redis_client.get().await.unwrap(),
    )
    .await?
    {
        Ok(())
    } else {
        Err(ApiError::NotFound("Instance does not exist".to_owned()))
    }
}
