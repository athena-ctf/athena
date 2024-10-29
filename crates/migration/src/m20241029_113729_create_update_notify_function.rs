use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();

        db.execute_unprepared(
            "CREATE FUNCTION table_update_notify() RETURNS trigger AS $$
DECLARE
    data json;
BEGIN
    data = row_to_json(NEW);
    PERFORM pg_notify('notification_insert', data::text);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;",
        )
        .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let db = manager.get_connection();

        db.execute_unprepared("DDROP FUNCTION table_update_notify;")
            .await?;

        Ok(())
    }
}
