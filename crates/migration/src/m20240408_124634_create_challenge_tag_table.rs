use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(ChallengeTag::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-challenge_tag")
                            .col(ChallengeTag::ChallengeId)
                            .col(ChallengeTag::TagId),
                    )
                    .col(
                        ColumnDef::new(ChallengeTag::CreatedAt)
                            .date_time()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(ChallengeTag::UpdatedAt)
                            .date_time()
                            .not_null(),
                    )
                    .col(ColumnDef::new(ChallengeTag::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(ChallengeTag::TagId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-challenge_tag-challenge_id")
                            .from(ChallengeTag::Table, ChallengeTag::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-challenge_tag-tag_id")
                            .from(ChallengeTag::Table, ChallengeTag::TagId)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(ChallengeTag::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum ChallengeTag {
    Table,
    ChallengeId,
    TagId,
    CreatedAt,
    UpdatedAt,
}

#[derive(DeriveIden)]
enum Tag {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}
