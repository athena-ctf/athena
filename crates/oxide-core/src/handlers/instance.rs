use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    ChallengeModel, CreateInstanceSchema, InstanceModel, JsonResponse, PlayerModel,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Instance);

single_relation_api!(Instance, Challenge);
single_relation_api!(Instance, Player);

// TODO: add '/challenge/start' and '/challenge/end' for players
