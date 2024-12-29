use clap::{Parser, Subcommand, ValueEnum};
use config::Settings;
use strum::{Display, EnumString};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

#[derive(Parser)]
/// Main api command
pub struct Command {
    #[command(subcommand)]
    pub subcommand: SubCommand,
}

#[derive(Subcommand)]
pub enum SubCommand {
    /// Generate artifacts
    Generate(GenerateSubCommand),

    /// Run the server
    Run,
}

#[derive(Parser)]
/// Generate artifacts
pub struct GenerateSubCommand {
    /// Kind of output to generate
    pub kind: GenerateKind,

    /// Output file path
    pub out: String,
}

#[derive(Clone, ValueEnum, Display, EnumString)]
#[strum(serialize_all = "kebab-case")]
pub enum GenerateKind {
    Config,
    OpenapiSchema,
}

#[tokio::main]
pub async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();

    let command = Command::parse();

    match command.subcommand {
        SubCommand::Generate(generate) => {
            tokio::fs::write(&generate.out, match generate.kind {
                GenerateKind::Config => Settings::default().default_json().unwrap(),
                GenerateKind::OpenapiSchema => api::api::get_schema().unwrap(),
            })
            .await
            .unwrap();

            tracing::info!("successfully written {} to {}", generate.kind, generate.out);
        }

        SubCommand::Run => {
            let settings = Settings::new(&std::env::args().nth(1).unwrap()).unwrap();
            api::start(settings).await.unwrap();
        }
    }

    tracing::debug!("exited successfully");
}
