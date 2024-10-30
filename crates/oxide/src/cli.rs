use std::fmt::Display;
use std::str::FromStr;

use argh::FromArgs;

#[derive(FromArgs)]
/// Main oxide command
pub struct Command {
    #[argh(subcommand)]
    pub subcommand: SubCommand,
}

#[derive(FromArgs)]
#[argh(subcommand)]
pub enum SubCommand {
    Run(RunSubCommand),
    Generate(GenerateSubCommand),
}

#[derive(FromArgs)]
/// Run server.
#[argh(subcommand, name = "run")]
pub struct RunSubCommand {
    #[argh(positional)]
    /// config file path
    pub config: String,
}

#[derive(FromArgs)]
/// Generate openapi specs.
#[argh(subcommand, name = "generate")]
pub struct GenerateSubCommand {
    #[argh(positional)]
    /// kind of output to generate
    pub kind: GenerateKind,

    #[argh(positional)]
    /// output file path
    pub out: String,
}

pub enum GenerateKind {
    Config,
    JsonSchema,
    OpenApiSchema,
}

impl Display for GenerateKind {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(match self {
            Self::Config => "config",
            Self::JsonSchema => "json-schema",
            Self::OpenApiSchema => "openapi-schema",
        })
    }
}

impl FromStr for GenerateKind {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "config" => Ok(Self::Config),
            "json-schema" => Ok(Self::JsonSchema),
            "openapi-schema" => Ok(Self::OpenApiSchema),
            _ => Err("invalid generate kind".to_owned()),
        }
    }
}
