//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

use super::sea_orm_active_enums::TicketStatusEnum;

#[derive(
    Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize, utoipa :: ToSchema,
)]
#[sea_orm(table_name = "ticket")]
# [schema (as = TicketModel)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub date_created: DateTime,
    pub title: String,
    pub status: TicketStatusEnum,
    pub assigned_to: Uuid,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::manager::Entity",
        from = "Column::AssignedTo",
        to = "super::manager::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Manager,
}

impl Related<super::manager::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Manager.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
