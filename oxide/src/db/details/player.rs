use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::player::ActiveModel;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct PlayerDetails {
    pub username: String,
    pub email: String,
    pub password: String,
    pub display_name: String,
    pub verified: bool,
    pub team_id: Option<Uuid>,
    pub ban_id: Option<Uuid>,
    pub discord_id: Option<String>,
}

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct UpdateProfileSchema {
    pub display_name: String,
    pub team_id: Uuid,
    pub discord_id: Option<String>,
}
