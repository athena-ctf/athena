use fred::prelude::*;
use ring::digest::{digest, SHA256};

use crate::errors::Result;

pub fn create() -> String {
    std::iter::repeat_with(fastrand::alphanumeric)
        .take(8)
        .collect()
}

pub async fn store(email: &str, token: &str, key: &str, redis_client: RedisPool) -> Result<bool> {
    let resp = redis_client
        .hset::<i32, _, _>(
            key,
            (
                email,
                faster_hex::hex_string(digest(&SHA256, token.as_bytes()).as_ref()),
            ),
        )
        .await?
        == 1;

    redis_client
        .hexpire::<(), _, _>(key, 3600, None, vec![email])
        .await?;

    Ok(resp)
}

pub async fn check(email: &str, token: &str, key: &str, redis_client: RedisPool) -> Result<bool> {
    let resp = redis_client
        .hget::<Option<Vec<u8>>, _, _>(key, email)
        .await?;

    if let Some(s) = resp {
        Ok(s == faster_hex::hex_string(digest(&SHA256, token.as_bytes()).as_ref()).as_bytes())
    } else {
        Ok(false)
    }
}
