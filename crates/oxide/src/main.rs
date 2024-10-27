mod cli;

use oxide_core::api;
use oxide_core::settings::Settings;
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

            api::start(settings).await.unwrap();
        }

        cli::SubCommand::Generate(generate) => {
            tokio::fs::write(
                &generate.out,
                if generate.config {
                    oxide_core::settings::Settings::default()
                        .default_json()
                        .unwrap()
                } else {
                    api::get_schema().unwrap()
                },
            )
            .await
            .unwrap();

            tracing::info!(
                "successfully written {} to {}",
                if generate.config {
                    "config"
                } else {
                    "openapi schema"
                },
                generate.out
            );
        }
    }

    tracing::debug!("exited successfully");
}
