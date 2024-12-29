use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Flag::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Flag::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Flag::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Flag::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Flag::Value).string().not_null())
                    .col(ColumnDef::new(Flag::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(Flag::PlayerId).uuid())
                    .col(ColumnDef::new(Flag::IgnoreCase).boolean().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-flag-challenge_id")
                            .from(Flag::Table, Flag::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-flag-player_id")
                            .from(Flag::Table, Flag::PlayerId)
                            .to(Player::Table, Player::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(Flag::Table).to_owned()).await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Flag {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Value,
    ChallengeId,
    PlayerId,
    IgnoreCase,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
