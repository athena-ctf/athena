use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::bind_crud_interface_api;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{SubmissionDetails, SubmissionModel};
use crate::service::AppState;

bind_crud_interface_api!(Submission, "challenge_id", "player_id");
