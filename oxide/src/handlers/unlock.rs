use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::bind_crud_interface;
use crate::schemas::{UnlockDetails, UnlockModel};
use crate::service::{ApiError, ApiResult, AppState};

bind_crud_interface!(Unlock, "player_id", "hint_id");
