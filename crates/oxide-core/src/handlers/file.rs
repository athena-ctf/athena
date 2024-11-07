use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{Challenge, ChallengeModel, CreateFileSchema, File, FileModel, JsonResponse};
use crate::service::{AppState, CachedJson};

crud_interface_api!(File);

single_relation_api!(File, Challenge);
