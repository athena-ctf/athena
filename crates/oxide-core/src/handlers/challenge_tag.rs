use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use chrono::Utc;
use fred::prelude::*;
use oxide_macros::join_table_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveModelTrait, ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Challenge, ChallengeModel, ChallengeTag, ChallengeTagModel, CreateChallengeTagSchema,
    JsonResponse, Tag, TagModel,
};
use crate::service::{AppState, CachedJson};

join_table_api!(ChallengeTag, Challenge, "challenge_id", Tag, "tag_id");
