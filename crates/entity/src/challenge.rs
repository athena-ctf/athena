//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use super::sea_orm_active_enums::ChallengeKindEnum;

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
#[sea_orm(table_name = "challenge")]
#[schema(as = ChallengeModel)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTimeWithTimeZone,
    pub updated_at: DateTimeWithTimeZone,
    pub title: String,
    pub description: String,
    pub points: i32,
    pub level: i32,
    pub kind: ChallengeKindEnum,
    pub author_name: String,
    pub solves: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::achievement::Entity")]
    Achievement,
    #[sea_orm(has_many = "super::challenge_tag::Entity")]
    ChallengeTag,
    #[sea_orm(has_many = "super::container::Entity")]
    Container,
    #[sea_orm(has_many = "super::deployment::Entity")]
    Deployment,
    #[sea_orm(has_many = "super::file::Entity")]
    File,
    #[sea_orm(has_many = "super::flag::Entity")]
    Flag,
    #[sea_orm(has_many = "super::hint::Entity")]
    Hint,
    #[sea_orm(has_many = "super::submission::Entity")]
    Submission,
}

impl Related<super::achievement::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Achievement.def()
    }
}

impl Related<super::challenge_tag::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ChallengeTag.def()
    }
}

impl Related<super::container::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Container.def()
    }
}

impl Related<super::deployment::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Deployment.def()
    }
}

impl Related<super::file::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::File.def()
    }
}

impl Related<super::flag::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Flag.def()
    }
}

impl Related<super::hint::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Hint.def()
    }
}

impl Related<super::submission::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Submission.def()
    }
}

impl Related<super::player::Entity> for Entity {
    fn to() -> RelationDef {
        super::submission::Relation::Player.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::submission::Relation::Challenge.def().rev())
    }
}

impl Related<super::tag::Entity> for Entity {
    fn to() -> RelationDef {
        super::challenge_tag::Relation::Tag.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::challenge_tag::Relation::Challenge.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
