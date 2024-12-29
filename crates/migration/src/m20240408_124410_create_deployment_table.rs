use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Deployment::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Deployment::Id).uuid().not_null().primary_key())
                    .col(
                        ColumnDef::new(Deployment::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Deployment::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Deployment::ExpiresAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Deployment::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(Deployment::PlayerId).uuid())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-deployment-challenge_id")
                            .from(Deployment::Table, Deployment::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-deployment-player_id")
                            .from(Deployment::Table, Deployment::PlayerId)
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
            .drop_table(Table::drop().table(Deployment::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Deployment {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    ChallengeId,
    PlayerId,
    ExpiresAt,
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
