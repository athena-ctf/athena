use std::sync::Arc;

use axum::extract::{Path, State};
use axum::Json;
use oxide_macros::JsonPath;
use serde_json::Value;

use crate::errors::{Error, Result};
use crate::schemas::JsonResponse;
use crate::service::AppState;

#[utoipa::path(
    get,
    path = "/admin/settings/{*path}",
    params(
        ("path" = String, Path, format = "path", description = "The path to the resource")
    ),
    operation_id = "settings_retrieve",
    responses(
        (status = 200, description = "Retrieved settings successfully", body = Value),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve settings at path
pub async fn retrieve(
    state: State<Arc<AppState>>,
    Path(path): Path<String>,
) -> Result<Json<Value>> {
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
            || {
                Err(Error::NotFound(
                    "The requested setting is not found".to_owned(),
                ))
            },
            |value| Ok(Json(value)),
        )
}

#[utoipa::path(
    patch,
    path = "/admin/settings/{*path}",
    params(
        ("path" = String, Path, format = "path", description = "The path to the resource")
    ),
    operation_id = "settings_update",
    request_body = Value,
    responses(
        (status = 200, description = "Retrieved settings successfully"),
        (status = 401, description = "Action is permissible after login", body = JsonResponse),
        (status = 403, description = "User does not have sufficient permissions", body = JsonResponse),
        (status = 500, description = "Unexpected error", body = JsonResponse)
    )
)]
/// Retrieve settings at path
pub async fn update(
    state: State<Arc<AppState>>,
    Path(path): Path<String>,
    Json(value): Json<Value>,
) -> Result<()> {
    if state.settings.write().await.update_at(
        &path
            .split('/')
            .filter(|&part| (!part.is_empty()))
            .map(ToString::to_string)
            .collect::<Vec<_>>(),
        value,
    ) {
        Ok(())
    } else {
        Err(Error::NotFound(
            "Could not update given settings".to_owned(),
        ))
    }
}
