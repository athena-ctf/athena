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
                    .as_enum(TokenContextEnum)
                    .values(TokenContextVariants::iter())
                    .to_owned(),
            )
            .await?;

        manager
            .create_table(
                Table::create()
                    .table(Token::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-token")
                            .col(Token::Context)
                            .col(Token::Email),
                    )
                    .col(
                        ColumnDef::new(Token::Context)
                            .enumeration(TokenContextEnum, TokenContextVariants::iter())
                            .not_null(),
                    )
                    .col(ColumnDef::new(Token::Email).string().not_null())
                    .col(ColumnDef::new(Token::Value).string_len(8).not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Token::Table).to_owned())
            .await?;

        manager
            .drop_type(Type::drop().if_exists().name(TokenContextEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
pub struct TokenContextEnum;

#[derive(DeriveIden, EnumIter)]
pub enum TokenContextVariants {
    Register,
    Reset,
}

#[derive(DeriveIden)]
enum Token {
    Table,
    Value,
    Context,
    Email,
}
