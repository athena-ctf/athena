use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::leaderboard::ActiveModel;
use crate::schemas::CategoryEnum;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct LeaderboardDetails {
    pub category: CategoryEnum,
    pub rank0: Option<String>,
    pub rank1: Option<String>,
    pub rank2: Option<String>,
    pub rank3: Option<String>,
    pub rank4: Option<String>,
    pub rank5: Option<String>,
    pub rank6: Option<String>,
    pub rank7: Option<String>,
    pub rank8: Option<String>,
    pub rank9: Option<String>,
}
