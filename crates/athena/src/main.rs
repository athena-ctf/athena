mod cli;

use clap::Parser;
use config::Settings;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
pub async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();

    let command = cli::Command::parse();

    match command.subcommand {
        cli::SubCommand::Generate(generate) => {
            tokio::fs::write(
                &generate.out,
                match generate.kind {
                    cli::GenerateKind::Config => Settings::default().default_json().unwrap(),
                    cli::GenerateKind::OpenapiSchema => oxide::api::get_schema().unwrap(),
                    cli::GenerateKind::JsonSchema => Settings::json_schema().unwrap(),
                },
            )
            .await
            .unwrap();

            tracing::info!("successfully written {} to {}", generate.kind, generate.out);
        }

        cli::SubCommand::Create(create) => {}
    }

    tracing::debug!("exited successfully");
}
