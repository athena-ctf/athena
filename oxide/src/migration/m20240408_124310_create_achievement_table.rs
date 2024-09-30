use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Achievement::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Achievement::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Achievement::DateCreated)
                            .date_time()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Achievement::Value).string().not_null())
                    .col(ColumnDef::new(Achievement::Prize).integer().not_null())
                    .col(ColumnDef::new(Achievement::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(Achievement::PlayerId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-achievement-challenge_id")
                            .from(Achievement::Table, Achievement::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-achievement-player_id")
                            .from(Achievement::Table, Achievement::PlayerId)
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
        manager
            .drop_table(Table::drop().table(Achievement::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Achievement {
    Table,
    Id,
    DateCreated,
    Value,
    Prize,
    ChallengeId,
    PlayerId,
    TeamId,
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
