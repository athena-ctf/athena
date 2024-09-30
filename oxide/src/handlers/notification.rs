use std::sync::Arc;

use axum::extract::{Json, Path, State};
use uuid::Uuid;

use crate::db;
use crate::macros::api::{crud_interface, single_relation};
use crate::schemas::{NotificationDetails, NotificationModel, PlayerModel};
use crate::service::{ApiError, ApiResult, AppState};

crud_interface!(Notification);

single_relation!(Notification, Player);
