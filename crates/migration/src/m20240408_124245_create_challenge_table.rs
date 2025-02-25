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
                    .as_enum(StateEnum)
                    .values(StateVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_type(
                Type::create()
                    .as_enum(ChallengeKindEnum)
                    .values(ChallengeKindVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Challenge::Table)
                    .if_not_exists()
                    .col(ColumnDef::new(Challenge::Id).uuid().not_null().primary_key())
                    .col(
                        ColumnDef::new(Challenge::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(Challenge::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(Challenge::Title).string().not_null().unique_key())
                    .col(ColumnDef::new(Challenge::Description).string().not_null())
                    .col(ColumnDef::new(Challenge::Points).integer().not_null())
                    .col(ColumnDef::new(Challenge::Level).integer().not_null())
                    .col(
                        ColumnDef::new(Challenge::Kind)
                            .enumeration(ChallengeKindEnum, ChallengeKindVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Challenge::AuthorName).string().not_null())
                    .col(
                        ColumnDef::new(Challenge::Tags)
                            .array(ColumnType::String(StringLen::None))
                            .not_null(),
                    )
                    .col(ColumnDef::new(Challenge::MaxAttempts).integer())
                    .col(
                        ColumnDef::new(Challenge::State)
                            .enumeration(StateEnum, StateVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Challenge::Grouping).json_binary())
                    .col(ColumnDef::new(Challenge::Requirements).json_binary())
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
            .drop_type(Type::drop().if_exists().name(ChallengeKindEnum).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(StateEnum).to_owned())
            .await?;

        Ok(())
    }
}

// TODO: add requirements, grouping and state in a json
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
    Level,
    Kind,
    Tags,
    MaxAttempts,
    State,
    Grouping,
    Requirements,
}

#[derive(DeriveIden)]
struct ChallengeKindEnum;

#[derive(DeriveIden, EnumIter)]
enum ChallengeKindVariants {
    StaticFlag,
    RegexFlag,
    StaticContainerized,
    DynamicContainerized,
}

#[derive(DeriveIden)]
struct StateEnum;

#[derive(DeriveIden, EnumIter)]
enum StateVariants {
    Disabled,
    Hidden,
    Visible,
}
