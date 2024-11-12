use std::sync::Arc;

use axum::extract::{Json, Path, State};
use axum::routing::get;
use axum::Router;
use fred::prelude::*;
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{CreateInviteSchema, Invite, InviteModel, JsonResponse, Team, TeamModel};
use crate::service::{AppState, CachedJson};

oxide_macros::crud!(Invite, single: [Team], optional: [], multiple: []);
