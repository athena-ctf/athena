use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use oxide_macros::{crud_interface_api, multiple_relation_api, single_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeModel, HintDetails, HintModel, TokenClaims, UnlockModel};
use crate::service::AppState;

crud_interface_api!(Hint);

single_relation_api!(Hint, Challenge);
multiple_relation_api!(Hint, Unlock);

#[utoipa::path(
    get,
    path = "/player/hint/unlock/{id}",
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
) -> Result<Json<HintModel>> {
    db::hint::unlock(id, claims.id, &state.db_conn)
        .await?
        .map_or_else(
            || Err(Error::NotFound("hint does not exists".to_owned())),
            |hint_model| Ok(Json(hint_model)),
        )
}
