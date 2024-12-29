use extension::postgres::Type;
use sea_orm::{EnumIter, Iterable};
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_type(
                Type::create()
                    .as_enum(TicketStatusEnum)
                    .values(TicketStatusVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Ticket::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Ticket::Id).uuid().primary_key().not_null())
                    .col(ColumnDef::new(Ticket::CreatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Ticket::UpdatedAt).timestamp_with_time_zone().not_null())
                    .col(ColumnDef::new(Ticket::Title).string().not_null())
                    .col(ColumnDef::new(Ticket::Description).text().not_null())
                    .col(
                        ColumnDef::new(Ticket::Status)
                            .enumeration(TicketStatusEnum, TicketStatusVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Ticket::OpenedBy).uuid().not_null())
                    .col(ColumnDef::new(Ticket::AssignedTo).uuid())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-ticket-assigned_to")
                            .from(Ticket::Table, Ticket::AssignedTo)
                            .to(Admin::Table, Admin::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-ticket-opened_by")
                            .from(Ticket::Table, Ticket::OpenedBy)
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
            .drop_table(Table::drop().table(Ticket::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(TicketStatusEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Ticket {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Title,
    Description,
    Status,
    OpenedBy,
    AssignedTo,
}

#[derive(DeriveIden)]
struct TicketStatusEnum;

#[derive(DeriveIden, EnumIter)]
enum TicketStatusVariants {
    Closed,
    Open,
    Resolved,
}

#[derive(DeriveIden)]
enum Admin {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Player {
    Table,
    Id,
}
