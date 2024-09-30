use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::Extension;
use sea_orm::{ActiveModelTrait, IntoActiveModel};
use uuid::Uuid;

use crate::db;
use crate::errors::AthenaError;
use crate::macros::api::{crud_interface, single_relation};
use crate::schemas::{JsonResponse, LeaderboardDetails, LeaderboardModel, TokenClaims};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Leaderboard);
