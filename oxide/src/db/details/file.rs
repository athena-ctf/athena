use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

use crate::entity::file::ActiveModel;
use crate::entity::sea_orm_active_enums::BackendEnum;

#[derive(Clone, Debug, PartialEq, Eq, DeriveIntoActiveModel, Serialize, Deserialize, ToSchema)]
pub struct FileDetails {
    pub backend: BackendEnum,
    pub mime: String,
    pub sha1_hash: String,
    pub name: String,
    pub challenge_id: Uuid,
}
