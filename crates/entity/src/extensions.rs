use chrono::{DateTime, Utc};
use sea_orm::prelude::*;
use sea_orm::{ActiveValue, FromJsonQueryResult, IntoActiveModel};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

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
            discord_id: self
                .discord_id
                .map_or(ActiveValue::NotSet, |discord_id| ActiveValue::Set(Some(discord_id))),
            avatar_url: ActiveValue::NotSet,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum GroupingKind {
    Linear {
        name: String,
        description: String,
        sequence: Vec<Uuid>,
        skipable: bool,
    },
    Simultaneous {
        name: String,
        description: String,
    },
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema, FromJsonQueryResult)]
pub struct Grouping {
    pub kind: GroupingKind,
    pub name: String,
    pub description: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(tag = "type", content = "data", rename_all = "snake_case")]
pub enum RequirementKind {
    MinScore { score: u64 },
    MaxScore { score: u64 },
    MinRank { rank: u64 },
    AfterTime { time: DateTime<Utc> },
    BeforeTime { time: DateTime<Utc> },
    DuringTime { start: DateTime<Utc>, end: DateTime<Utc> },
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum InvalidAction {
    Hide,
    Disable,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema, FromJsonQueryResult)]
pub struct Requirements {
    pub kind: RequirementKind,
    pub invalid_action: InvalidAction,
}
