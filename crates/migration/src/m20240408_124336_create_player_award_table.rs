use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(PlayerAward::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-player_award")
                            .col(PlayerAward::PlayerId)
                            .col(PlayerAward::AwardId),
                    )
                    .col(
                        ColumnDef::new(PlayerAward::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(PlayerAward::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(PlayerAward::PlayerId).uuid().not_null())
                    .col(ColumnDef::new(PlayerAward::AwardId).uuid().not_null())
                    .col(ColumnDef::new(PlayerAward::Count).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player_award-player_id")
                            .from(PlayerAward::Table, PlayerAward::PlayerId)
                            .to(Player::Table, Player::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player_award-award_id")
                            .from(PlayerAward::Table, PlayerAward::AwardId)
                            .to(Award::Table, Award::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(PlayerAward::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum PlayerAward {
    Table,
    PlayerId,
    AwardId,
    CreatedAt,
    UpdatedAt,
    Count,
}

#[derive(DeriveIden)]
enum Award {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
