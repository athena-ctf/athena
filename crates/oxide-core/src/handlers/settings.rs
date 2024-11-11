use std::sync::Arc;

use axum::extract::{Path, State};
use axum::Json;
use oxide_macros::JsonPath;
use serde_json::Value;

use crate::errors::{Error, Result};
use crate::service::AppState;

// TODO: add documentation

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
