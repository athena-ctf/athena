use chrono::Utc;
use sea_orm::{ActiveValue, IntoActiveModel, IntoActiveValue};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use super::sea_orm_active_enums::*;

impl IntoActiveValue<Self> for ChallengeKindEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for RoleEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for TicketStatusEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
pub struct UpdateProfileSchema {
    pub username: String,
    pub email: String,
    pub discord_id: Option<String>,
}

impl IntoActiveModel<super::player::ActiveModel> for UpdateProfileSchema {
    fn into_active_model(self) -> super::player::ActiveModel {
        super::player::ActiveModel {
            id: ActiveValue::NotSet,
            created_at: ActiveValue::NotSet,
            updated_at: ActiveValue::Set(Utc::now().fixed_offset()),
            email: ActiveValue::Set(self.email),
            username: ActiveValue::Set(self.username),
            password: ActiveValue::NotSet,
            team_id: ActiveValue::NotSet,
            ban_id: ActiveValue::NotSet,
            discord_id: self.discord_id.map_or(ActiveValue::NotSet, |discord_id| {
                ActiveValue::Set(Some(discord_id))
            }),
            avatar_url: ActiveValue::NotSet,
        }
    }
}
