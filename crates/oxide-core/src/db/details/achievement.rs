use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::achievement::ActiveModel;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct AchievementDetails {
    pub value: String,
    pub challenge_id: Uuid,
    pub player_id: Uuid,
    pub prize: i32,
}
