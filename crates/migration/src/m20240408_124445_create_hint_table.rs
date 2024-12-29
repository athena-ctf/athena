use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Hint::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Hint::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Hint::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Hint::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Hint::Description).string().not_null())
                    .col(ColumnDef::new(Hint::Cost).integer().not_null())
                    .col(ColumnDef::new(Hint::ChallengeId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-hint-challenge_id")
                            .from(Hint::Table, Hint::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(Hint::Table).to_owned()).await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Hint {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Description,
    Cost,
    ChallengeId,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}
