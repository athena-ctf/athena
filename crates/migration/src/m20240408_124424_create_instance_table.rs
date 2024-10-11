use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Instance::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Instance::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Instance::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Instance::UpdatedAt).date_time().not_null())
                    .col(
                        ColumnDef::new(Instance::ContainerId)
                            .string()
                            .not_null()
                            .unique_key(),
                    )
                    .col(ColumnDef::new(Instance::Expiry).date_time().not_null())
                    .col(ColumnDef::new(Instance::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(Instance::PlayerId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-instance-challenge_id")
                            .from(Instance::Table, Instance::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-instance-player_id")
                            .from(Instance::Table, Instance::PlayerId)
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
            .drop_table(Table::drop().table(Instance::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Instance {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    ChallengeId,
    PlayerId,
    ContainerId,
    Expiry,
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
