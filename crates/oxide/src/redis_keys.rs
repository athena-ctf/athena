pub const CHALLENGE_SOLVES: &str = "challenge:solves";
pub const REFRESH_TOKEN_BLACKLIST: &str = "refresh_tokens:blacklist";
pub const PLAYER_LAST_UPDATED: &str = "player:last_updated";
pub const ADMIN_LAST_UPDATED: &str = "admin:last_updated";

pub fn token_key(key: &str, email: &str) -> String {
    format!("token:{key}:{email}")
}
