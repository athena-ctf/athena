use std::sync::Arc;

use axum::extract::{Json, Path, State};
use chrono::Utc;
use fred::prelude::*;
use oxide_macros::join_crud_interface_api;
use sea_orm::prelude::*;
use sea_orm::{ActiveModelTrait, ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{ChallengeTag, ChallengeTagModel, CreateChallengeTagSchema, JsonResponse};
use crate::service::{AppState, CachedJson};

join_crud_interface_api!(ChallengeTag, Challenge, "challenge_id", Tag, "tag_id");
