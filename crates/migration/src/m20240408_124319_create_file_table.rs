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
                    .as_enum(BackendEnum)
                    .values(BackendVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(File::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(File::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(File::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(File::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(File::Name).string().not_null())
                    .col(
                        ColumnDef::new(File::Backend)
                            .enumeration(BackendEnum, BackendVariants::iter())
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(File::Table).to_owned()).await?;

        manager
            .drop_type(Type::drop().if_exists().name(BackendEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum File {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Name,
    Backend,
}

#[derive(DeriveIden)]
struct BackendEnum;

#[derive(DeriveIden, EnumIter)]
enum BackendVariants {
    Local,
    S3,
    Azure,
    Gcp,
}
