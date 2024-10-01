mod cli;

use oxide_core::settings::Settings;
use oxide_core::{api, migration};

use sea_orm::Database;
use sea_orm_migration::MigratorTrait;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
pub async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();

    let command = argh::from_env::<cli::Command>();

    match command.subcommand {
        cli::SubCommand::Run(run) => {
            let settings = Settings::new(&run.config).unwrap();

            if run.migrate {
                let db = Database::connect(settings.db_url()).await.unwrap();
                migration::Migrator::fresh(&db).await.unwrap();

                api::start_with_db_conn(settings, db).await.unwrap();
            } else {
                api::start(settings).await.unwrap();
            }
        }

        cli::SubCommand::Generate(generate) => {
            tokio::fs::write(&generate.out, api::get_schema().unwrap())
                .await
                .unwrap();
        }

        cli::SubCommand::Migrate(migrate) => {
            let db = Database::connect(&migrate.url).await.unwrap();
            migration::Migrator::fresh(&db).await.unwrap();
        }
    }

    tracing::info!("exited successfully");
}
