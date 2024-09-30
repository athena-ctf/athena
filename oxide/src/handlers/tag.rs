use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, multiple_relation};
use crate::schemas::{ChallengeModel, TagDetails, TagModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Tag);
multiple_relation!(Tag, Challenge);
