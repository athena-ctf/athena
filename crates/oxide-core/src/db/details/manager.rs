use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::manager::ActiveModel;
use crate::entity::sea_orm_active_enums::RoleEnum;

#[derive(Clone, Debug, PartialEq, DeriveIntoActiveModel, Eq, Serialize, Deserialize, ToSchema)]
pub struct ManagerDetails {
    pub username: String,
    pub email: String,
    pub password: String,
    pub role: RoleEnum,
}
