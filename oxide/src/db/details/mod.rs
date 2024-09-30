pub mod achievement;
pub mod ban;
pub mod challenge;
pub mod file;
pub mod flag;
pub mod hint;
pub mod instance;
pub mod invite;
pub mod leaderboard;
pub mod notification;
pub mod player;
pub mod submission;
pub mod tag;
pub mod team;
pub mod ticket;

pub mod prelude {
    pub use super::achievement::AchievementDetails;
    pub use super::ban::BanDetails;
    pub use super::challenge::ChallengeDetails;
    pub use super::file::FileDetails;
    pub use super::flag::FlagDetails;
    pub use super::hint::HintDetails;
    pub use super::instance::InstanceDetails;
    pub use super::invite::InviteDetails;
    pub use super::leaderboard::LeaderboardDetails;
    pub use super::notification::NotificationDetails;
    pub use super::player::PlayerDetails;
    pub use super::submission::SubmissionDetails;
    pub use super::tag::TagDetails;
    pub use super::team::TeamDetails;
    pub use super::ticket::TicketDetails;
}
