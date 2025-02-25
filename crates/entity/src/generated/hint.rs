//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "hint")]
#[api_macros::gen_schemas(id_descriptor = "description")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTimeWithTimeZone,
    pub updated_at: DateTimeWithTimeZone,
    pub description: String,
    pub cost: i32,
    pub challenge_id: Uuid,
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
    #[sea_orm(has_many = "super::unlock::Entity")]
    Unlock,
}

impl Related<super::challenge::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Challenge.def()
    }
}

impl Related<super::unlock::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Unlock.def()
    }
}

impl Related<super::player::Entity> for Entity {
    fn to() -> RelationDef {
        super::unlock::Relation::Player.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::unlock::Relation::Hint.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
