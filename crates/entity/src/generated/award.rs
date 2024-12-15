//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "award")]
#[oxide_macros::gen_schemas(id_descriptor = "value")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub created_at: DateTimeWithTimeZone,
    pub updated_at: DateTimeWithTimeZone,
    #[sea_orm(unique)]
    pub value: String,
    pub prize: i32,
    pub logo_url: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::player_award::Entity")]
    PlayerAward,
}

impl Related<super::player_award::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::PlayerAward.def()
    }
}

impl Related<super::player::Entity> for Entity {
    fn to() -> RelationDef {
        super::player_award::Relation::Player.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::player_award::Relation::Award.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
