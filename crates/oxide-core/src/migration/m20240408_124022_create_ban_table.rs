use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Ban::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Ban::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Ban::DateCreated).date_time().not_null())
                    .col(ColumnDef::new(Ban::Reason).string().not_null())
                    .col(ColumnDef::new(Ban::Duration).integer().not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Ban::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Ban {
    Table,
    Id,
    DateCreated,
    Reason,
    Duration,
}
