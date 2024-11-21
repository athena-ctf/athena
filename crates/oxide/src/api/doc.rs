use utoipa::openapi::security::{Http, HttpAuthScheme, SecurityScheme};
use utoipa::{Modify, OpenApi};

use crate::handlers::*;

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
    paths(
        award::list,
        award::create,
        award::retrieve_by_id,
        award::update_by_id,
        award::delete_by_id,
        award::retrieve_relations_by_id,
        award::export,
        award::import,
        admin::list,
        admin::create,
        admin::retrieve_by_id,
        admin::update_by_id,
        admin::delete_by_id,
        admin::retrieve_relations_by_id,
        admin::export,
        admin::import,
        admin::get_current_logged_in,
        auth::admin::login,
        auth::player::login,
        auth::player::register,
        auth::player::register_verify_email,
        auth::player::register_verify_invite,
        auth::player::register_send_token,
        auth::player::reset_password,
        auth::player::reset_password_send_token,
        ban::list,
        ban::create,
        ban::retrieve_by_id,
        ban::update_by_id,
        ban::delete_by_id,
        ban::add_player_by_id,
        ban::retrieve_relations_by_id,
        ban::export,
        ban::import,
        challenge_file::list,
        challenge_file::create,
        challenge_file::retrieve_by_id,
        challenge_file::update_by_id,
        challenge_file::delete_by_id,
        challenge_file::retrieve_relations_by_id,
        challenge_file::export,
        challenge_file::import,
        challenge_tag::list,
        challenge_tag::create,
        challenge_tag::retrieve_by_id,
        challenge_tag::update_by_id,
        challenge_tag::delete_by_id,
        challenge_tag::retrieve_relations_by_id,
        challenge_tag::export,
        challenge_tag::import,
        challenge::list,
        challenge::create,
        challenge::retrieve_by_id,
        challenge::update_by_id,
        challenge::delete_by_id,
        challenge::retrieve_relations_by_id,
        challenge::export,
        challenge::import,
        challenge::player_challenges,
        challenge::detailed_challenge,
        challenge::start_challenge,
        challenge::stop_challenge,
        container::list,
        container::create,
        container::retrieve_by_id,
        container::update_by_id,
        container::delete_by_id,
        container::retrieve_relations_by_id,
        container::export,
        container::import,
        deployment::list,
        deployment::create,
        deployment::retrieve_by_id,
        deployment::update_by_id,
        deployment::delete_by_id,
        deployment::retrieve_relations_by_id,
        deployment::export,
        deployment::import,
        file::list,
        file::create,
        file::retrieve_by_id,
        file::update_by_id,
        file::delete_by_id,
        file::retrieve_relations_by_id,
        file::export,
        file::import,
        flag::list,
        flag::create,
        flag::retrieve_by_id,
        flag::update_by_id,
        flag::delete_by_id,
        flag::retrieve_relations_by_id,
        flag::export,
        flag::import,
        flag::verify,
        hint::list,
        hint::create,
        hint::retrieve_by_id,
        hint::update_by_id,
        hint::delete_by_id,
        hint::retrieve_relations_by_id,
        hint::export,
        hint::import,
        hint::unlock_by_id,
        instance::list,
        instance::create,
        instance::retrieve_by_id,
        instance::update_by_id,
        instance::delete_by_id,
        instance::retrieve_relations_by_id,
        instance::export,
        instance::import,
        invite::list,
        invite::create,
        invite::retrieve_by_id,
        invite::update_by_id,
        invite::delete_by_id,
        invite::retrieve_relations_by_id,
        invite::export,
        invite::import,
        leaderboard::team_top_10,
        leaderboard::team_rankings,
        leaderboard::player_top_10,
        leaderboard::player_rankings,
        notification::list,
        notification::create,
        notification::retrieve_by_id,
        notification::update_by_id,
        notification::delete_by_id,
        notification::retrieve_relations_by_id,
        notification::export,
        notification::import,
        notification::player_list,
        player::list,
        player::create,
        player::retrieve_by_id,
        player::update_by_id,
        player::delete_by_id,
        player::retrieve_profile_by_username,
        player::retrieve_relations_by_id,
        player::export,
        player::import,
        player::update_profile_by_id,
        player::retrieve_summary,
        player::get_current_logged_in,
        player_award::list,
        player_award::create,
        player_award::retrieve_by_id,
        player_award::update_by_id,
        player_award::delete_by_id,
        player_award::retrieve_relations_by_id,
        player_award::export,
        player_award::import,
        settings::retrieve,
        settings::update,
        stats::retrieve,
        submission::list,
        submission::create,
        submission::retrieve_by_id,
        submission::update_by_id,
        submission::delete_by_id,
        submission::retrieve_relations_by_id,
        submission::export,
        submission::import,
        tag::list,
        tag::create,
        tag::retrieve_by_id,
        tag::update_by_id,
        tag::delete_by_id,
        tag::retrieve_relations_by_id,
        tag::export,
        tag::import,
        team::list,
        team::create,
        team::retrieve_by_id,
        team::update_by_id,
        team::delete_by_id,
        team::retrieve_relations_by_id,
        team::export,
        team::import,
        team::retrieve_team_by_teamname,
        team::update_details,
        team::retrieve_summary,
        ticket::list,
        ticket::create,
        ticket::retrieve_by_id,
        ticket::update_by_id,
        ticket::delete_by_id,
        ticket::retrieve_relations_by_id,
        ticket::export,
        ticket::import,
        unlock::list,
        unlock::create,
        unlock::retrieve_by_id,
        unlock::update_by_id,
        unlock::delete_by_id,
        unlock::retrieve_relations_by_id,
        unlock::export,
        unlock::import,
    ),
    components(),
    modifiers(&SecurityAddon),
    security(
        ("bearerAuth" = [])
    )
)]
pub struct Openapi;

pub struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let mut bearer_auth = Http::new(HttpAuthScheme::Bearer);
        bearer_auth.bearer_format = Some("Bearer".to_owned());

        if let Some(components) = openapi.components.as_mut() {
            components.add_security_scheme("bearerAuth", SecurityScheme::Http(bearer_auth));
        }
    }
}
