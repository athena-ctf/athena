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
                    .as_enum(CategoryEnum)
                    .values(CategoryVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Leaderboard::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Leaderboard::Id)
                            .uuid()
                            .primary_key()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Leaderboard::DateCreated)
                            .date_time()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Leaderboard::Category)
                            .enumeration(CategoryEnum, CategoryVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Leaderboard::Rank0).string())
                    .col(ColumnDef::new(Leaderboard::Rank1).string())
                    .col(ColumnDef::new(Leaderboard::Rank2).string())
                    .col(ColumnDef::new(Leaderboard::Rank3).string())
                    .col(ColumnDef::new(Leaderboard::Rank4).string())
                    .col(ColumnDef::new(Leaderboard::Rank5).string())
                    .col(ColumnDef::new(Leaderboard::Rank6).string())
                    .col(ColumnDef::new(Leaderboard::Rank7).string())
                    .col(ColumnDef::new(Leaderboard::Rank8).string())
                    .col(ColumnDef::new(Leaderboard::Rank9).string())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Leaderboard::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().name(CategoryEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Leaderboard {
    Table,
    Id,
    DateCreated,
    Category,
    Rank0,
    Rank1,
    Rank2,
    Rank3,
    Rank4,
    Rank5,
    Rank6,
    Rank7,
    Rank8,
    Rank9,
}

#[derive(DeriveIden)]
struct CategoryEnum;

#[derive(DeriveIden, EnumIter)]
enum CategoryVariants {
    Player,
    Team,
}
