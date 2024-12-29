use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Team::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Team::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Team::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Team::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Team::Email).string().not_null())
                    .col(ColumnDef::new(Team::Name).string().not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(Team::Table).to_owned()).await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Team {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Email,
    Name,
}
