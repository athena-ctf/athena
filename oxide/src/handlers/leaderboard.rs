use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::crud_interface;
use crate::schemas::{LeaderboardDetails, LeaderboardModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Leaderboard);
