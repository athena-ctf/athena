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
                    .col(
                        ColumnDef::new(Player::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Player::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Player::TeamId).uuid().not_null())
                    .col(ColumnDef::new(Player::BanId).uuid().unique_key())
                    .col(ColumnDef::new(Player::DiscordId).string().unique_key())
                    .col(ColumnDef::new(Player::Username).string().not_null())
                    .col(
                        ColumnDef::new(Player::Email)
                            .string()
                            .unique_key()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Player::Password).string().not_null())
                    .col(ColumnDef::new(Player::AvatarUrl).string().not_null())
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
    Username,
    Email,
    #[sea_orm(iden = "_password")]
    Password,
    BanId,
    TeamId,
    DiscordId,
    AvatarUrl,
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
