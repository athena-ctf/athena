use std::sync::Arc;

use axum::extract::{Path, State};
use axum::Json;
use serde_json::Value;

use crate::service::{AppState, Settings};

fn get_setting_value(settings: &Settings, path: &str) -> Option<Value> {
    let value = serde_json::to_value(settings).ok()?;
    path.split('.')
        .try_fold(value, |acc, key| acc.get(key).cloned())
}

fn set_setting_value(settings: &mut Settings, path: &str, value: Value) -> Result<(), String> {
    let mut current = serde_json::to_value(&settings).map_err(|e| e.to_string())?;
    let parts: Vec<&str> = path.split('.').collect();
    let last = parts.len() - 1;

    for (i, key) in parts.iter().enumerate() {
        if i == last {
            *current
                .get_mut(key)
                .ok_or_else(|| "Invalid path".to_string())? = value.clone();
        } else {
            current = current
                .get_mut(key)
                .ok_or_else(|| "Invalid path".to_string())?
                .take();
        }
    }

    *settings = serde_json::from_value(current).map_err(|e| e.to_string())?;

    Ok(())
}

#[utoipa::path(
    get,
    path = "/settings/{component}",
    responses(
        (status = 200, description = "Got settings successfully", body = JsonModel),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Get settings
pub async fn get_setting(
    State(state): State<Arc<AppState>>,
    Path(component): Path<String>,
) -> Result<Json<Value>, String> {
    let settings = state.settings.read().await;
    get_setting_value(&settings, &component)
        .map(Json)
        .ok_or_else(|| "Setting not found".to_string())
}

#[utoipa::path(
    put,
    path = "/settings/{component}",
    request_body = Value,
    responses(
        (status = 200, description = "Updated settings successfully"),
        (status = 401, description = "Action is permissible after login", body = ErrorModel),
        (status = 403, description = "User does not have sufficient permissions", body = ErrorModel),
        (status = 500, description = "Unexpected error", body = ErrorModel)
    )
)]
/// Update settings
pub async fn update_setting(
    State(state): State<Arc<AppState>>,
    Path(component): Path<String>,
    Json(value): Json<Value>,
) -> Result<(), String> {
    let mut settings = state.settings.write().await;
    set_setting_value(&mut settings, &component, value)
}
