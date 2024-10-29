use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::crud_interface_api;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{JsonResponse,CreateLeaderboardSchema, LeaderboardModel};
use crate::service::AppState;

crud_interface_api!(Leaderboard);
