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
    Challenge, ChallengeModel, CreateDeploymentSchema, Deployment, DeploymentModel, Instance,
    InstanceModel, JsonResponse, Player, PlayerModel,
};
use crate::service::{AppState, CachedJson};

oxide_macros::derive::crud!(Deployment, single: [Challenge, Player], optional: [], multiple: [Instance]);
