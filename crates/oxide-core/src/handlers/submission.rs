use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::join_crud_interface_api;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{CreateSubmissionSchema, JsonResponse, SubmissionModel};
use crate::service::{AppState, CachedJson};

join_crud_interface_api!(Submission, "challenge_id", "player_id");
