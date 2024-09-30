use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Notification::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Notification::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Notification::Title).string().not_null())
                    .col(ColumnDef::new(Notification::Content).string().not_null())
                    .col(
                        ColumnDef::new(Notification::DateCreated)
                            .date_time()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Notification::PlayerId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-notification-player_id")
                            .from(Notification::Table, Notification::PlayerId)
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
            .drop_table(Table::drop().table(Notification::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Notification {
    Table,
    Id,
    Title,
    Content,
    DateCreated,
    PlayerId,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
