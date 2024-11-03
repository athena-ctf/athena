use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, multiple_relation_api, single_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{
    ChallengeModel, CreateDeploymentSchema, DeploymentModel, InstanceModel, JsonResponse,
    PlayerModel,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Deployment);

single_relation_api!(Deployment, Challenge);
single_relation_api!(Deployment, Player);

multiple_relation_api!(Deployment, Instance);
