use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Unlock::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-unlock")
                            .col(Unlock::PlayerId)
                            .col(Unlock::HintId),
                    )
                    .col(ColumnDef::new(Unlock::DateCreated).date_time().not_null())
                    .col(ColumnDef::new(Unlock::PlayerId).uuid().not_null())
                    .col(ColumnDef::new(Unlock::HintId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-unlock-player_id")
                            .from(Unlock::Table, Unlock::PlayerId)
                            .to(Player::Table, Player::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-unlock-hint_id")
                            .from(Unlock::Table, Unlock::HintId)
                            .to(Hint::Table, Hint::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Unlock::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Unlock {
    Table,
    HintId,
    PlayerId,
    DateCreated,
}

#[derive(DeriveIden)]
enum Hint {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
