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
                    .col(ColumnDef::new(Ticket::DateCreated).date_time().not_null())
                    .col(ColumnDef::new(Ticket::Title).string().not_null())
                    .col(
                        ColumnDef::new(Ticket::Status)
                            .enumeration(TicketStatusEnum, TicketStatusVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Ticket::AssignedTo).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-ticket-manager_id")
                            .from(Ticket::Table, Ticket::AssignedTo)
                            .to(Manager::Table, Manager::Id)
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
    DateCreated,
    Title,
    Status,
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
enum Manager {
    Table,
    Id,
}
