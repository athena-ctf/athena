use clap::{Parser, Subcommand, ValueEnum};
use strum::{Display, EnumString};

#[derive(Parser)]
/// Main oxide command
pub struct Command {
    #[command(subcommand)]
    pub subcommand: SubCommand,
}

#[derive(Subcommand)]
pub enum SubCommand {
    /// Generate artifacts
    Generate(GenerateSubCommand),

    /// Create entities
    Create(CreateSubCommand),
}

#[derive(Parser)]
/// Generate artifacts
pub struct GenerateSubCommand {
    /// Kind of output to generate
    pub kind: GenerateKind,

    /// Output file path
    pub out: String,
}

#[derive(Parser)]
pub struct CreateSubCommand {
    #[arg(long, short)]
    /// Path to config file
    pub config: String,
}

#[derive(Clone, ValueEnum, Display, EnumString)]
#[strum(serialize_all = "kebab-case")]
pub enum GenerateKind {
    Config,
    ConfigSchema,
    OpenapiSchema,
}

#[derive(Clone, Parser)]
pub enum CreateKind {
    Challenge {
        #[arg(long, short)]
        challenge_file: String,
    },
    Admin {
        username: String,
        // role: entity::sea_orm_active_enums::RoleEnum,
    },
}
