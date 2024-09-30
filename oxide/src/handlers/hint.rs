use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use uuid::Uuid;

use crate::db;
use crate::db::details::hint::HintSummary;
use crate::macros::api::{crud_interface, multiple_relation, single_relation};
use crate::schemas::{ChallengeModel, HintDetails, HintModel, TokenClaims, UnlockModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Hint);

single_relation!(Hint, Challenge);
multiple_relation!(Hint, Unlock);

#[utoipa::path(
    get,
    path = "/hint/summary",
    responses(
        (status = 200, description = "Listed hint summaries successfully", body = [HintModel]),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// List hin summaries
pub async fn list_summaries(state: State<Arc<AppState>>) -> ApiResult<Json<Vec<HintSummary>>> {
    Ok(Json(db::hint::list_summaries(&state.db_conn).await?))
}

#[utoipa::path(
    get,
    path = "/hint/{id}/unlock",
    params(("id" = Uuid, Path, description = "Id of entity")),
    responses(
        (status = 200, description = "Unlocked hint by id successfully", body = HintModel),
        (status = 400, description = "Invalid parameters format", body = ErrorModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 404, description = "No hint found with specified id", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Unlock hint by id
pub async fn unlock_by_id(
    Extension(claims): Extension<TokenClaims>,
    state: State<Arc<AppState>>,
    Path(id): Path<Uuid>,
) -> ApiResult<Json<HintModel>> {
    db::hint::unlock(id, claims.id, &state.db_conn)
        .await?
        .map_or_else(
            || Err(ApiError::NotFound("hint does not exists".to_owned())),
            |hint_model| Ok(Json(hint_model)),
        )
}
