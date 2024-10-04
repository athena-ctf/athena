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
    /// output file path
    pub out: String,
}
