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
                    .as_enum(BackendEnum)
                    .values(BackendVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(File::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(File::Id).uuid().not_null().primary_key())
                    .col(ColumnDef::new(File::DateCreated).date_time().not_null())
                    .col(ColumnDef::new(File::Name).string().not_null())
                    .col(
                        ColumnDef::new(File::Backend)
                            .enumeration(BackendEnum, BackendVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(File::Mime).string().not_null())
                    .col(ColumnDef::new(File::Sha1Hash).string().not_null())
                    .col(ColumnDef::new(File::ChallengeId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-file-challenge_id")
                            .from(File::Table, File::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
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
            .drop_table(Table::drop().table(File::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(BackendEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
struct BackendEnum;

#[derive(DeriveIden, EnumIter)]
enum BackendVariants {
    StaticServer,
    AwsS3,
}

#[derive(DeriveIden)]
enum File {
    Table,
    Id,
    DateCreated,
    Name,
    Backend,
    Mime,
    Sha1Hash,
    ChallengeId,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}
