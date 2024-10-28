use std::sync::Arc;

use axum::extract::{Json, Path, State};
use oxide_macros::{crud_interface_api, optional_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{AdminModel, CreateTicketSchema, TicketModel};
use crate::service::AppState;

crud_interface_api!(Ticket);

optional_relation_api!(Ticket, Admin);
