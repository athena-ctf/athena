use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Invite::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Invite::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(Invite::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Invite::UpdatedAt).date_time().not_null())
                    .col(ColumnDef::new(Invite::Remaining).integer().not_null())
                    .col(ColumnDef::new(Invite::TeamId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-invite-team_id")
                            .from(Invite::Table, Invite::TeamId)
                            .to(Team::Table, Team::Id)
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
            .drop_table(Table::drop().table(Invite::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Invite {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Remaining,
    TeamId,
}

#[derive(DeriveIden)]
enum Team {
    Table,
    Id,
}
