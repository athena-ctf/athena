use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Submission::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-submission")
                            .col(Submission::ChallengeId)
                            .col(Submission::PlayerId),
                    )
                    .col(
                        ColumnDef::new(Submission::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Submission::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Submission::IsCorrect).boolean().not_null())
                    .col(ColumnDef::new(Submission::PlayerId).uuid().not_null())
                    .col(ColumnDef::new(Submission::ChallengeId).uuid().not_null())
                    .col(
                        ColumnDef::new(Submission::Flags)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-submission-player_id")
                            .from(Submission::Table, Submission::PlayerId)
                            .to(Player::Table, Player::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-submission-challenge_id")
                            .from(Submission::Table, Submission::ChallengeId)
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
        manager
            .drop_table(Table::drop().table(Submission::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Submission {
    Table,
    IsCorrect,
    CreatedAt,
    UpdatedAt,
    PlayerId,
    ChallengeId,
    Flags,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}
