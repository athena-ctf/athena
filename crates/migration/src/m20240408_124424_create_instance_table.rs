use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Instance::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Instance::Id).uuid().not_null().primary_key())
                    .col(
                        ColumnDef::new(Instance::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Instance::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Instance::ContainerId)
                            .string()
                            .not_null()
                            .unique_key(),
                    )
                    .col(ColumnDef::new(Instance::ContainerName).string().not_null())
                    .col(
                        ColumnDef::new(Instance::PortMapping)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .col(ColumnDef::new(Instance::DeploymentId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-instance-deployment_id")
                            .from(Instance::Table, Instance::DeploymentId)
                            .to(Deployment::Table, Deployment::Id)
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
            .drop_table(Table::drop().table(Instance::Table).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Instance {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    DeploymentId,
    ContainerId,
    ContainerName,
    PortMapping,
}

#[derive(DeriveIden)]
enum Deployment {
    Table,
    Id,
}
