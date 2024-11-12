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
    Achievement, AchievementModel, Challenge, ChallengeModel, CreateAchievementSchema,
    JsonResponse, Player, PlayerModel,
};
use crate::service::{AppState, CachedJson};

oxide_macros::derive::crud!(Achievement, single: [Player, Challenge], optional: [], multiple: []);
