use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Admin::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Admin::Id).uuid().primary_key().not_null())
                    .col(ColumnDef::new(Admin::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Admin::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Admin::Role).string().not_null())
                    .col(ColumnDef::new(Admin::Username).string().not_null())
                    .col(ColumnDef::new(Admin::Password).string().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(Admin::Table).to_owned()).await
    }
}

#[derive(DeriveIden)]
enum Admin {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Username,
    #[sea_orm(iden = "_password")]
    Password,
    Role,
}
