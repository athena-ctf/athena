use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::submission::ActiveModel;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct SubmissionDetails {
    pub flag: String,
    pub player_id: Uuid,
    pub challenge_id: Uuid,
    pub is_correct: bool,
}
