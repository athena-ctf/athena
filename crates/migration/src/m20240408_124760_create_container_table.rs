use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Container::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Container::Id).uuid().primary_key())
                    .col(ColumnDef::new(Container::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Container::UpdatedAt).date_time().not_null())
                    .col(ColumnDef::new(Container::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(Container::Name).string().not_null())
                    .col(ColumnDef::new(Container::Image).string().not_null())
                    .col(ColumnDef::new(Container::Internal).boolean().not_null())
                    .col(ColumnDef::new(Container::MemoryLimit).integer().not_null())
                    .col(
                        ColumnDef::new(Container::Command)
                            .array(ColumnType::String(StringLen::None)),
                    )
                    .col(
                        ColumnDef::new(Container::Environment)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Container::Ports)
                            .array(ColumnType::Integer)
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Container::Networks)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Container::DependsOn)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-container-challenge_id")
                            .from(Container::Table, Container::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Container::Table).to_owned())
            .await?;
        Ok(())
    }
}

#[derive(Iden)]
enum Challenge {
    Table,
    Id,
}

#[derive(Iden)]
enum Container {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    ChallengeId,
    Name,
    Image,
    Internal,
    MemoryLimit,
    Command,
    Environment,
    Ports,
    Networks,
    DependsOn,
}
