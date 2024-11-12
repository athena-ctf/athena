use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{Challenge, ChallengeModel, CreateFileSchema, File, FileModel, JsonResponse};
use crate::service::{AppState, CachedJson};

oxide_macros::derive::crud!(File, single: [Challenge], optional: [], multiple: []);
