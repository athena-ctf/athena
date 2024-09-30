use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, multiple_relation, optional_relation};
use crate::schemas::{BanModel, InviteModel, PlayerModel, TeamDetails, TeamModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Team);

optional_relation!(Team, Ban);

multiple_relation!(Team, Invite);
multiple_relation!(Team, Player);
