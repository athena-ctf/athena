use utoipa::openapi::security::{Http, HttpAuthScheme, SecurityScheme};
use utoipa::{Modify, OpenApi};

// TODO: add way to add macro generated ones
#[derive(OpenApi)]
#[openapi(
    info(
        contact(
            email = "athena.help@gmail.com",
            name = "AthenaCTF Team"
        ),
        description = "TODO: add proper description",
        license(
            name = "MIT",
            url = "https://www.mit.edu/~amini/LICENSE.md"
        ),
        title = "Athena CTF",
        version = "0.1.0"
    ),
    modifiers(&SecurityAddon),
    security(
        ("bearerAuth" = [])
    ),
    tags(
        (name = "achievement", description = "Routes regarding the achievement table"),
        (name = "auth", description = "Routes regarding authentication/authorization"),
        (name = "ban", description = "Routes regarding the ban table"),
        (name = "challenge", description = "Routes regarding the challenge table"),
        (name = "file", description = "Routes regarding the file table"),
        (name = "flag", description = "Routes regarding the flag table"),
        (name = "hint", description = "Routes regarding the hint table"),
        (name = "instance", description = "Routes regarding the instance table"),
        (name = "invite", description = "Routes regarding the invite table"),
        (name = "notification", description = "Routes regarding the notification table"),
        (name = "player", description = "Routes regarding the player table"),
        (name = "submission", description = "Routes regarding the submission table"),
        (name = "tag", description = "Routes regarding the tag table"),
        (name = "team", description = "Routes regarding the team table"),
        (name = "user", description = "Routes regarding the user table")
    )
)]
pub struct Openapi;

pub struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let mut bearer_auth = Http::new(HttpAuthScheme::Bearer);
        bearer_auth.bearer_format = Some("JWT".to_owned());

        if let Some(components) = openapi.components.as_mut() {
            components.add_security_scheme("bearerAuth", SecurityScheme::Http(bearer_auth));
        }
    }
}
