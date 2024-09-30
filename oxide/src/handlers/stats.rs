use std::sync::Arc;

use axum::extract::State;
use axum::Json;

use crate::db;
use crate::schemas::StatSchema;
use crate::service::{ApiResult, AppState};

#[utoipa::path(
    get,
    path = "/stats",
    responses(
        (status = 200, description = "Got stats successfully", body = StatSchema),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Get stats of all tables
pub async fn get(state: State<Arc<AppState>>) -> ApiResult<Json<StatSchema>> {
    Ok(Json(db::stats(&state.db_conn).await?))
}
