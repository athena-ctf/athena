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
                    .table(Manager::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Manager::Id).uuid().primary_key().not_null())
                    .col(ColumnDef::new(Manager::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Manager::UpdatedAt).date_time().not_null())
                    .col(
                        ColumnDef::new(Manager::Username)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Manager::Email)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Manager::Password).string().not_null())
                    .col(
                        ColumnDef::new(Manager::Role)
                            .enumeration(RoleEnum, RoleVariants::iter())
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Manager::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(RoleEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Manager {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Username,
    Email,
    #[sea_orm(iden = "_password")]
    Password,
    Role,
}

#[derive(DeriveIden)]
struct RoleEnum;

#[derive(DeriveIden, EnumIter)]
enum RoleVariants {
    Admin,
    Moderator,
    Judge,
    Editor,
    Analyst,
}
