use sea_orm::entity::prelude::*;
use sea_orm::{ActiveValue, IntoActiveModel};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::submission::ActiveModel;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
pub struct SubmissionDetails {
    pub player_id: Uuid,
    pub challenge_id: Uuid,
    pub is_correct: bool,
    pub flags: Vec<String>,
}

impl IntoActiveModel<ActiveModel> for SubmissionDetails {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            date_created: ActiveValue::NotSet,
            is_correct: ActiveValue::Set(self.is_correct),
            player_id: ActiveValue::Set(self.player_id),
            challenge_id: ActiveValue::Set(self.challenge_id),
            flags: ActiveValue::Set(self.flags),
        }
    }
}
