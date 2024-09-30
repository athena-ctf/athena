use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::notification::ActiveModel;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct NotificationDetails {
    pub content: String,
    pub title: String,
    pub player_id: Uuid,
}
