use utoipa_config::Config;

fn main() {
    Config::new()
        .alias_for("DateTimeWithTimeZone", "DateTime<FixedOffset>")
        .write_to_file();
}
