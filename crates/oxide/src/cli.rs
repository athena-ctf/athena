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
    Migrate(MigrateSubCommand),
}

#[derive(FromArgs)]
/// Run server.
#[argh(subcommand, name = "run")]
pub struct RunSubCommand {
    #[argh(positional)]
    /// config file path
    pub config: String,

    #[argh(switch, short = 'm')]
    /// migrate before running
    pub migrate: bool,
}

#[derive(FromArgs)]
/// Generate openapi specs.
#[argh(subcommand, name = "generate")]
pub struct GenerateSubCommand {
    #[argh(positional)]
    /// output file path
    pub out: String,
}

#[derive(FromArgs)]
/// Migrate database.
#[argh(subcommand, name = "migrate")]
pub struct MigrateSubCommand {
    #[argh(positional)]
    /// database url
    pub url: String,
}
