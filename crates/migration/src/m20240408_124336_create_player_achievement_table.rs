use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(PlayerAchievement::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-player_achievement")
                            .col(PlayerAchievement::PlayerId)
                            .col(PlayerAchievement::AchievementId),
                    )
                    .col(
                        ColumnDef::new(PlayerAchievement::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(PlayerAchievement::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(PlayerAchievement::PlayerId)
                            .uuid()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(PlayerAchievement::AchievementId)
                            .uuid()
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player_achievement-player_id")
                            .from(PlayerAchievement::Table, PlayerAchievement::PlayerId)
                            .to(Player::Table, Player::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player_achievement-achievement_id")
                            .from(PlayerAchievement::Table, PlayerAchievement::AchievementId)
                            .to(Achievement::Table, Achievement::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(PlayerAchievement::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum PlayerAchievement {
    Table,
    PlayerId,
    AchievementId,
    CreatedAt,
    UpdatedAt,
}

#[derive(DeriveIden)]
enum Achievement {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
