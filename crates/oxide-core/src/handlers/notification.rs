use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use uuid::Uuid;

use crate::db;
use crate::errors::{Error, Result};
use crate::schemas::{CreateNotificationSchema, JsonResponse, NotificationModel, PlayerModel};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Notification);

single_relation_api!(Notification, Player);
