use uuid::Uuid;

pub const PLAYER_LEADERBOARD: &str = "leaderboard:player";
pub const TEAM_LEADERBOARD: &str = "leaderboard:team";
pub const CHALLENGE_SOLVES: &str = "challenge:solves";
pub const REFRESH_TOKEN_BLACKLIST: &str = "refresh_tokens:blacklist";
pub const PLAYER_LAST_UPDATED: &str = "player:last_updated";
pub const ADMIN_LAST_UPDATED: &str = "admin:last_updated";

pub fn player_history_key(id: Uuid) -> String {
    format!("player:history:{id}")
}

pub fn token_key(key: &str, email: &str) -> String {
    format!("token:{key}:{email}")
}
