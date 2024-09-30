use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, optional_relation};
use crate::schemas::{ManagerModel, TicketDetails, TicketModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Ticket);

optional_relation!(Ticket, Manager);
