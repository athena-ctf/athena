use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, multiple_relation_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    Challenge, ChallengeModel, CreateDeploymentSchema, Deployment, DeploymentModel, Instance,
    InstanceModel, JsonResponse, Player, PlayerModel,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Deployment);

single_relation_api!(Deployment, Challenge);
single_relation_api!(Deployment, Player);

multiple_relation_api!(Deployment, Instance);
