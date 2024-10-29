use std::sync::Arc;

use axum::extract::State;
use axum::Json;

use crate::db;
use crate::errors::Result;
use crate::schemas::{JsonResponse, StatSchema};
use crate::service::AppState;

#[utoipa::path(
    get,
    path = "/stats",
    responses(
        (status = 200, description = "Retrieved stats successfully", body = StatSchema),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve stats of all tables
pub async fn retrieve(state: State<Arc<AppState>>) -> Result<Json<StatSchema>> {
    Ok(Json(db::stats(&state.db_conn).await?))
}
