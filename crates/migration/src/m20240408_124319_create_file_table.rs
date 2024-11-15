use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(File::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(File::Id).uuid().not_null().primary_key())
                    .col(
                        ColumnDef::new(File::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(File::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(File::Name).string().not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(File::Table).to_owned())
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
}
