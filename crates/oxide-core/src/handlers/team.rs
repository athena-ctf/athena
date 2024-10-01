use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::{crud_interface_api, multiple_relation_api, optional_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{BanModel, InviteModel, PlayerModel, TeamDetails, TeamModel};
use crate::service::AppState;

crud_interface_api!(Team);

optional_relation_api!(Team, Ban);

multiple_relation_api!(Team, Invite);
multiple_relation_api!(Team, Player);
