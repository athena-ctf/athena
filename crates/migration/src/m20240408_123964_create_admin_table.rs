use extension::postgres::Type;
use sea_orm::{EnumIter, Iterable};
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_type(
                Type::create()
                    .as_enum(RoleEnum)
                    .values(RoleVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Admin::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Admin::Id).uuid().primary_key().not_null())
                    .col(
                        ColumnDef::new(Admin::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Admin::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Admin::Role)
                            .enumeration(RoleEnum, RoleVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Admin::UserId).uuid().not_null().unique_key())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-admin-user_id")
                            .from(Admin::Table, Admin::UserId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Admin::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(RoleEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Admin {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Role,
    UserId,
}

#[derive(DeriveIden)]
pub enum User {
    Table,
    Id,
}

#[derive(DeriveIden)]
pub struct RoleEnum;

#[derive(DeriveIden, EnumIter)]
pub enum RoleVariants {
    Analyst,
    Editor,
    Judge,
    Manager,
    Moderator,
}
