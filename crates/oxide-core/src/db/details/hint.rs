use sea_orm::entity::prelude::*;
use sea_orm::FromQueryResult;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::hint::{ActiveModel, Entity as Hint};

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct HintDetails {
    pub challenge_id: Uuid,
    pub cost: i32,
    pub description: String,
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
