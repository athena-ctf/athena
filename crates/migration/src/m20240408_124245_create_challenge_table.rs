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
                    .as_enum(DifficultyEnum)
                    .values(DifficultyVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_type(
                Type::create()
                    .as_enum(ChallengeTypeEnum)
                    .values(ChallengeTypeVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Challenge::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Challenge::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Challenge::CreatedAt).date_time().not_null())
                    .col(ColumnDef::new(Challenge::UpdatedAt).date_time().not_null())
                    .col(ColumnDef::new(Challenge::Title).string().not_null())
                    .col(ColumnDef::new(Challenge::Description).string().not_null())
                    .col(ColumnDef::new(Challenge::Points).integer().not_null())
                    .col(
                        ColumnDef::new(Challenge::Difficulty)
                            .enumeration(DifficultyEnum, DifficultyVariants::iter())
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Challenge::ChallengeType)
                            .enumeration(ChallengeTypeEnum, ChallengeTypeVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Challenge::AuthorName).string().not_null())
                    .col(ColumnDef::new(Challenge::Solves).integer().not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Challenge::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(DifficultyEnum).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(ChallengeTypeEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
    CreatedAt,
    UpdatedAt,
    Title,
    Description,
    Points,
    AuthorName,
    Difficulty,
    ChallengeType,
    Solves,
}

#[derive(DeriveIden)]
struct DifficultyEnum;

#[derive(DeriveIden, EnumIter)]
enum DifficultyVariants {
    Easy,
    Medium,
    Hard,
    Extreme,
}

#[derive(DeriveIden)]
struct ChallengeTypeEnum;

#[derive(DeriveIden, EnumIter)]
enum ChallengeTypeVariants {
    StaticFlag,
    RegexFlag,
    Containerized,
}
