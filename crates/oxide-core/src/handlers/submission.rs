use std::sync::Arc;

use axum::extract::{Json, Path, State};
use chrono::Utc;
use fred::prelude::*;
use oxide_macros::join_crud_interface_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{CreateSubmissionSchema, JsonResponse, Submission, SubmissionModel};
use crate::service::{AppState, CachedJson};

join_crud_interface_api!(Submission, Challenge, "challenge_id", Player, "player_id");
