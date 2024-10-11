use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::join_crud_interface_api;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeTagDetails, ChallengeTagModel};
use crate::service::AppState;

join_crud_interface_api!(ChallengeTag, "challenge_id", "tag_id");
