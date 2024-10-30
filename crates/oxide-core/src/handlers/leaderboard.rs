use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::crud_interface_api;
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{CreateLeaderboardSchema, JsonResponse, LeaderboardModel};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Leaderboard);
