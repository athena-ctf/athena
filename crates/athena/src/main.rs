mod cli;

use config::Settings;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[tokio::main]
pub async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();

    let command = argh::from_env::<cli::Command>();

    match command.subcommand {
        cli::SubCommand::Generate(generate) => {
            tokio::fs::write(
                &generate.out,
                match generate.kind {
                    cli::GenerateKind::Config => Settings::default().default_json().unwrap(),
                    cli::GenerateKind::OpenApiSchema => oxide::api::get_schema().unwrap(),
                    cli::GenerateKind::JsonSchema => Settings::json_schema().unwrap(),
                },
            )
            .await
            .unwrap();

            tracing::info!("successfully written {} to {}", generate.kind, generate.out);
        }
    }

    tracing::debug!("exited successfully");
}
