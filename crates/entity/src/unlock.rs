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
    utoipa :: ToSchema,
    oxide_macros :: derive :: Details,
)]
#[sea_orm(table_name = "unlock")]
#[schema(as = UnlockModel)]
#[oxide(table(name = "Unlock", join))]
pub struct Model {
    pub created_at: DateTime,
    pub updated_at: DateTime,
    #[sea_orm(primary_key, auto_increment = false)]
    #[serde(skip_deserializing)]
    pub player_id: Uuid,
    #[sea_orm(primary_key, auto_increment = false)]
    #[serde(skip_deserializing)]
    pub hint_id: Uuid,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::hint::Entity",
        from = "Column::HintId",
        to = "super::hint::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Hint,
    #[sea_orm(
        belongs_to = "super::player::Entity",
        from = "Column::PlayerId",
        to = "super::player::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Player,
}

impl Related<super::hint::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Hint.def()
    }
}

impl Related<super::player::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Player.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
