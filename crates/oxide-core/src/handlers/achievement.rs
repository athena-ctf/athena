use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Achievement, AchievementModel, CreateAchievementSchema, JsonResponse, Player,
    PlayerAchievement, PlayerAchievementModel, PlayerModel,
};
use crate::service::{AppState, CachedJson};

oxide_macros::crud!(
    Achievement,
    single: [Player, PlayerAchievement],
    optional: [],
    multiple: [],
    on_delete: async {
        Ok::<(), Error>(())
    }
);
