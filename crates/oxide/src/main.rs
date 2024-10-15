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
                        .default_toml()
                        .unwrap()
                } else {
                    api::get_schema().unwrap()
                },
            )
            .await
            .unwrap();
        }
    }

    tracing::info!("exited successfully");
}
