use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::db::TicketStatusEnum;
use crate::entity::ticket::ActiveModel;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct TicketDetails {
    pub title: String,
    pub status: TicketStatusEnum,
    pub assigned_to: Uuid,
}
