use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Player::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Player::Id).uuid().primary_key().not_null())
                    .col(ColumnDef::new(Player::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Player::UpdatedAt).date_time().not_null())
                    .col(ColumnDef::new(Player::DisplayName).string().not_null())
                    .col(ColumnDef::new(Player::TeamId).uuid())
                    .col(ColumnDef::new(Player::BanId).uuid())
                    .col(ColumnDef::new(Player::DiscordId).string().unique_key())
                    .col(
                        ColumnDef::new(Player::UserId)
                            .uuid()
                            .not_null()
                            .unique_key(),
                    )
                    .col(
                        ColumnDef::new(Player::Score)
                            .integer()
                            .not_null()
                            .default(0),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player-team_id")
                            .from(Player::Table, Player::TeamId)
                            .to(Team::Table, Team::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player-ban_id")
                            .from(Player::Table, Player::BanId)
                            .to(Ban::Table, Ban::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-player-user_id")
                            .from(Player::Table, Player::UserId)
                            .to(User::Table, User::Id)
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
            .drop_table(Table::drop().table(Player::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    UserId,
    DisplayName,
    BanId,
    TeamId,
    DiscordId,
    Score,
}

#[derive(DeriveIden)]
enum Team {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Ban {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
}
