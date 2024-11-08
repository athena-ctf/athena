use chrono::Utc;
use sea_orm::prelude::Uuid;
use sea_orm::{ActiveValue, DerivePartialModel, FromQueryResult, IntoActiveModel, IntoActiveValue};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use super::challenge::Entity as Challenge;
use super::sea_orm_active_enums::*;

impl IntoActiveValue<Self> for DifficultyEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for FlagTypeEnum {
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
    pub team_id: Option<Uuid>,
    pub discord_id: Option<String>,
}

impl IntoActiveModel<super::player::ActiveModel> for UpdateProfileSchema {
    fn into_active_model(self) -> super::player::ActiveModel {
        super::player::ActiveModel {
            id: ActiveValue::NotSet,
            user_id: ActiveValue::NotSet,
            created_at: ActiveValue::NotSet,
            updated_at: ActiveValue::Set(Utc::now().naive_utc()),
            team_id: self.team_id.map_or(ActiveValue::NotSet, ActiveValue::Set),
            ban_id: ActiveValue::NotSet,
            discord_id: self.discord_id.map_or(ActiveValue::NotSet, |discord_id| {
                ActiveValue::Set(Some(discord_id))
            }),
            score: ActiveValue::NotSet,
        }
    }
}

#[derive(Serialize, Debug, Deserialize, Clone, ToSchema, DerivePartialModel, FromQueryResult)]
#[sea_orm(entity = "Challenge")]
pub struct PartialChallenge {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub points: i32,
    pub difficulty: DifficultyEnum,
    pub author_name: String,
    pub solves: i32,
}
