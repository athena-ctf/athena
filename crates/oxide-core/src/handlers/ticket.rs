use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{Admin, AdminModel, CreateTicketSchema, JsonResponse, Ticket, TicketModel};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Ticket);

single_relation_api!(Ticket, Admin);
