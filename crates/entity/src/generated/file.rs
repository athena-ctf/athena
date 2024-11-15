//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Clone,
    Debug,
    PartialEq,
    DeriveEntityModel,
    Eq,
    Serialize,
    Deserialize,
    utoipa::ToSchema,
    oxide_macros::Details,
)]
#[sea_orm(table_name = "file")]
#[schema(as = FileModel)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTimeWithTimeZone,
    pub updated_at: DateTimeWithTimeZone,
    pub name: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::challenge_file::Entity")]
    ChallengeFile,
}

impl Related<super::challenge_file::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ChallengeFile.def()
    }
}

impl Related<super::challenge::Entity> for Entity {
    fn to() -> RelationDef {
        super::challenge_file::Relation::Challenge.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::challenge_file::Relation::File.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
