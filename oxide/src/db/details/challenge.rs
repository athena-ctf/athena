use sea_orm::entity::prelude::*;
use sea_orm::{ActiveValue, FromJsonQueryResult, IntoActiveValue};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::docker::StrippedCompose;
use crate::entity::challenge::ActiveModel;
use crate::entity::sea_orm_active_enums::{ChallengeStatusEnum, DifficultyEnum, FlagTypeEnum};

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Serialize, Deserialize, ToSchema)]
pub struct ChallengeDetails {
    pub author_name: String,
    pub description: String,
    pub difficulty: DifficultyEnum,
    pub container_meta: Option<ContainerMeta>,
    pub points: i32,
    pub status: ChallengeStatusEnum,
    pub flag_type: FlagTypeEnum,
    pub title: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, FromJsonQueryResult, ToSchema)]
pub struct ContainerMeta {
    pub compose: StrippedCompose,
    pub single_instance: bool,
}

impl IntoActiveValue<Self> for ContainerMeta {
    fn into_active_value(self) -> ActiveValue<Self> {
        ActiveValue::Set(self)
    }
}
