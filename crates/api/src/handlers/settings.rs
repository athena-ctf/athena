use std::sync::Arc;

use axum::extract::{Path, State};
use axum::routing::get;
use axum::{Json, Router};
use config::JsonPath;
use serde_json::Value;

use crate::errors::{Error, Result};
use crate::schemas::JsonResponse;
use crate::{ApiResponse, AppState};

#[api_macros::requires_permission(permission = "settings:read")]
#[utoipa::path(
    get,
    path = "/admin/settings/{*path}",
    params(
        ("path" = String, Path, format = "path")
    ),
    operation_id = "settings_retrieve",
    responses(
        (status = 200, body = Value),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn retrieve(state: State<Arc<AppState>>, Path(path): Path<String>) -> Result<ApiResponse<Json<Value>>> {
    state
        .settings
        .read()
        .await
        .retrieve_at(
            &path
                .split('/')
                .filter(|&part| (!part.is_empty()))
                .map(ToString::to_string)
                .collect::<Vec<_>>(),
        )
        .map_or_else(
            || Err(Error::NotFound("The requested setting is not found".to_owned())),
            |value| Ok(ApiResponse::json_ok(value)),
        )
}

#[api_macros::requires_permission(permission = "settings:update")]
#[utoipa::path(
    patch,
    path = "/admin/settings/{*path}",
    params(
        ("path" = String, Path, format = "path")
    ),
    operation_id = "settings_update",
    request_body = Value,
    responses(
        (status = 200, body = JsonResponse),
        (status = 401, body = JsonResponse),
        (status = 403, body = JsonResponse),
        (status = 404, body = JsonResponse),
        (status = 500, body = JsonResponse)
    )
)]
pub async fn update(
    state: State<Arc<AppState>>,
    Path(path): Path<String>,
    Json(value): Json<Value>,
) -> Result<ApiResponse<Json<JsonResponse>>> {
    if state.settings.write().await.update_at(
        &path
            .split('/')
            .filter(|&part| (!part.is_empty()))
            .map(ToString::to_string)
            .collect::<Vec<_>>(),
        value,
    ) {
        Ok(ApiResponse::json_ok(JsonResponse {
            message: "successfully updated settings".to_owned(),
        }))
    } else {
        Err(Error::NotFound("Could not update given settings".to_owned()))
    }
}

pub fn router() -> Router<Arc<AppState>> {
    Router::new().route("/settings/*path", get(retrieve).patch(update))
}
