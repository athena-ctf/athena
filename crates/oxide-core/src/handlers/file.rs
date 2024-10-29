use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::{crud_interface_api, single_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeModel, CreateFileSchema, FileModel, JsonResponse};
use crate::service::AppState;

crud_interface_api!(File);
single_relation_api!(File, Challenge);
