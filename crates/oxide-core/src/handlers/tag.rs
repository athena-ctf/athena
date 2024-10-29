use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::{crud_interface_api, multiple_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{ChallengeModel, CreateTagSchema, JsonResponse, TagModel};
use crate::service::AppState;

crud_interface_api!(Tag);
multiple_relation_api!(Tag, Challenge);
