use std::sync::Arc;

use axum::extract::{Json, Path, State};
use fred::prelude::*;
use oxide_macros::{crud_interface_api, single_relation_api};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use uuid::Uuid;

use crate::errors::{Error, Result};
use crate::schemas::{
    CreateNotificationSchema, JsonResponse, Notification, NotificationModel, Player, PlayerModel,
};
use crate::service::{AppState, CachedJson};

crud_interface_api!(Notification);

single_relation_api!(Notification, Player);
