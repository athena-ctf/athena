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
#[sea_orm(table_name = "player")]
#[schema(as = PlayerModel)]
#[oxide(table(name = "Player"))]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    #[serde(skip_deserializing)]
    pub id: Uuid,
    pub created_at: DateTime,
    pub updated_at: DateTime,
    pub display_name: String,
    pub team_id: Uuid,
    pub ban_id: Option<Uuid>,
    #[sea_orm(unique)]
    pub discord_id: Option<String>,
    #[sea_orm(unique)]
    pub user_id: Uuid,
    pub score: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::achievement::Entity")]
    Achievement,
    #[sea_orm(
        belongs_to = "super::ban::Entity",
        from = "Column::BanId",
        to = "super::ban::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Ban,
    #[sea_orm(has_many = "super::flag::Entity")]
    Flag,
    #[sea_orm(has_many = "super::instance::Entity")]
    Instance,
    #[sea_orm(has_many = "super::notification::Entity")]
    Notification,
    #[sea_orm(has_many = "super::submission::Entity")]
    Submission,
    #[sea_orm(
        belongs_to = "super::team::Entity",
        from = "Column::TeamId",
        to = "super::team::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Team,
    #[sea_orm(has_many = "super::unlock::Entity")]
    Unlock,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    User,
}

impl Related<super::achievement::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Achievement.def()
    }
}

impl Related<super::ban::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Ban.def()
    }
}

impl Related<super::flag::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Flag.def()
    }
}

impl Related<super::instance::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Instance.def()
    }
}

impl Related<super::notification::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Notification.def()
    }
}

impl Related<super::submission::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Submission.def()
    }
}

impl Related<super::team::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Team.def()
    }
}

impl Related<super::unlock::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Unlock.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl Related<super::challenge::Entity> for Entity {
    fn to() -> RelationDef {
        super::submission::Relation::Challenge.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::submission::Relation::Player.def().rev())
    }
}

impl Related<super::hint::Entity> for Entity {
    fn to() -> RelationDef {
        super::unlock::Relation::Hint.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::unlock::Relation::Player.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
