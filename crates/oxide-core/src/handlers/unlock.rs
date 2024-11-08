use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use chrono::Utc;
use fred::prelude::*;
use oxide_macros::join_table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    CreateUnlockSchema, Hint, HintModel, JsonResponse, Player, PlayerModel, Unlock, UnlockModel,
};
use crate::service::{AppState, CachedJson};

join_table_api!(Unlock, Player, "player_id", Hint, "hint_id");

// TODO: add relations
