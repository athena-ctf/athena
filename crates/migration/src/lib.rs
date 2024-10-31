pub use sea_orm_migration::prelude::*;

mod m20240408_123948_create_user_table;
mod m20240408_123964_create_admin_table;
mod m20240408_124022_create_ban_table;
mod m20240408_124042_create_team_table;
mod m20240408_124136_create_player_table;
mod m20240408_124245_create_challenge_table;
mod m20240408_124310_create_achievement_table;
mod m20240408_124319_create_file_table;
mod m20240408_124342_create_flag_table;
mod m20240408_124400_create_tag_table;
mod m20240408_124424_create_instance_table;
mod m20240408_124445_create_hint_table;
mod m20240408_124465_create_unlock_table;
mod m20240408_124505_create_notification_table;
mod m20240408_124527_create_invite_table;
mod m20240408_124602_create_submission_table;
mod m20240408_124634_create_challenge_tag_table;
mod m20240408_124760_create_ticket_table;
mod m20241029_113729_create_update_notify_function;
mod m20241029_114100_create_notification_change_trigger;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20240408_123948_create_user_table::Migration),
            Box::new(m20240408_123964_create_admin_table::Migration),
            Box::new(m20240408_124022_create_ban_table::Migration),
            Box::new(m20240408_124042_create_team_table::Migration),
            Box::new(m20240408_124136_create_player_table::Migration),
            Box::new(m20240408_124245_create_challenge_table::Migration),
            Box::new(m20240408_124310_create_achievement_table::Migration),
            Box::new(m20240408_124319_create_file_table::Migration),
            Box::new(m20240408_124342_create_flag_table::Migration),
            Box::new(m20240408_124400_create_tag_table::Migration),
            Box::new(m20240408_124424_create_instance_table::Migration),
            Box::new(m20240408_124445_create_hint_table::Migration),
            Box::new(m20240408_124465_create_unlock_table::Migration),
            Box::new(m20240408_124505_create_notification_table::Migration),
            Box::new(m20240408_124527_create_invite_table::Migration),
            Box::new(m20240408_124602_create_submission_table::Migration),
            Box::new(m20240408_124634_create_challenge_tag_table::Migration),
            Box::new(m20240408_124760_create_ticket_table::Migration),
            // FIXME: These 2 have hardcoded trigger and notification channel name
            Box::new(m20241029_113729_create_update_notify_function::Migration),
            Box::new(m20241029_114100_create_notification_change_trigger::Migration),
        ]
    }
}
