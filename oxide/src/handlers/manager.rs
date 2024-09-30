use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, multiple_relation};
use crate::schemas::{ManagerDetails, ManagerModel, TicketModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Manager);

multiple_relation!(Manager, Ticket);
