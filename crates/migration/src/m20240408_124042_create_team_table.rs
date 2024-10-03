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
                    .col(ColumnDef::new(Team::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Team::UpdatedAt).date_time().not_null())
                    .col(ColumnDef::new(Team::Email).string().not_null())
                    .col(ColumnDef::new(Team::Name).string().not_null())
                    .col(ColumnDef::new(Team::BanId).uuid())
                    .col(ColumnDef::new(Team::Score).integer().not_null().default(0))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-team-ban_id")
                            .from(Team::Table, Team::BanId)
                            .to(Ban::Table, Ban::Id)
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
            .drop_table(Table::drop().table(Team::Table).to_owned())
            .await?;

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
    BanId,
    Score,
}

#[derive(DeriveIden)]
enum Ban {
    Table,
    Id,
}
