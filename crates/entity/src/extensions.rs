use chrono::Utc;
use sea_orm::prelude::Uuid;
use sea_orm::{ActiveValue, DerivePartialModel, FromQueryResult, IntoActiveModel, IntoActiveValue};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use super::hint::Entity as Hint;
use super::sea_orm_active_enums::*;

impl IntoActiveValue<Self> for BackendEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for CategoryEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

impl IntoActiveValue<Self> for ChallengeStatusEnum {
    fn into_active_value(self) -> sea_orm::ActiveValue<Self> {
        sea_orm::ActiveValue::Set(self)
    }
}

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
    pub display_name: String,
    pub team_id: Uuid,
    pub discord_id: Option<String>,
}

impl IntoActiveModel<super::player::ActiveModel> for UpdateProfileSchema {
    fn into_active_model(self) -> super::player::ActiveModel {
        super::player::ActiveModel {
            id: ActiveValue::NotSet,
            user_id: ActiveValue::NotSet,
            display_name: ActiveValue::Set(self.display_name),
            created_at: ActiveValue::NotSet,
            updated_at: ActiveValue::Set(Utc::now().naive_utc()),
            team_id: ActiveValue::Set(Some(self.team_id)),
            ban_id: ActiveValue::NotSet,
            discord_id: ActiveValue::Set(self.discord_id),
            score: ActiveValue::NotSet,
        }
    }
}

#[derive(
    Clone,
    Debug,
    PartialEq,
    DerivePartialModel,
    FromQueryResult,
    Eq,
    Serialize,
    Deserialize,
    ToSchema,
)]
#[sea_orm(entity = "Hint")]
pub struct HintSummary {
    pub id: Uuid,
    pub cost: i32,
}
