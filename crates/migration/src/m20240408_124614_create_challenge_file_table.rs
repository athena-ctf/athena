use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(ChallengeFile::Table)
                    .if_not_exists()
                    .primary_key(
                        Index::create()
                            .name("pk-challenge_file")
                            .col(ChallengeFile::ChallengeId)
                            .col(ChallengeFile::FileId),
                    )
                    .col(
                        ColumnDef::new(ChallengeFile::CreatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(
                        ColumnDef::new(ChallengeFile::UpdatedAt)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .col(ColumnDef::new(ChallengeFile::ChallengeId).uuid().not_null())
                    .col(ColumnDef::new(ChallengeFile::FileId).uuid().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-challenge_file-challenge_id")
                            .from(ChallengeFile::Table, ChallengeFile::ChallengeId)
                            .to(Challenge::Table, Challenge::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-challenge_file-file_id")
                            .from(ChallengeFile::Table, ChallengeFile::FileId)
                            .to(File::Table, File::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(ChallengeFile::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum ChallengeFile {
    Table,
    ChallengeId,
    FileId,
    CreatedAt,
    UpdatedAt,
}

#[derive(DeriveIden)]
enum File {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum Challenge {
    Table,
    Id,
}
