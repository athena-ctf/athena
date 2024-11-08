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
    oxide_macros::derive::Details,
)]
#[sea_orm(table_name = "container")]
#[schema(as = ContainerModel)]
#[oxide(table(name = "Container"))]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub challenge_id: Uuid,
    pub name: String,
    pub image: String,
    pub internal: bool,
    pub memory_limit: i32,
    pub command: Vec<String>,
    pub environment: Vec<String>,
    pub ports: Vec<i32>,
    pub networks: Vec<String>,
    pub depends_on: Vec<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::challenge::Entity",
        from = "Column::ChallengeId",
        to = "super::challenge::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Challenge,
}

impl Related<super::challenge::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Challenge.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
