use bb8::PooledConnection;
use bb8_redis::redis::AsyncCommands;
use bb8_redis::RedisConnectionManager;
use redis::{ToRedisArgs, Value};
use ring::digest::{digest, SHA256};
use strum::{Display, EnumString};

use crate::errors::Result;

#[derive(Display, EnumString, Clone, Copy)]
#[strum(serialize_all = "lowercase")]
pub enum HashKey {
    Register,
    Reset,
}

impl ToRedisArgs for HashKey {
    fn write_redis_args<W>(&self, out: &mut W)
    where
        W: ?Sized + redis::RedisWrite,
    {
        out.write_arg_fmt(self);
    }
}

pub fn create() -> String {
    std::iter::repeat_with(fastrand::alphanumeric)
        .take(8)
        .collect()
}

pub async fn store(
    email: &str,
    token: &str,
    key: HashKey,
    redis_client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<bool> {
    let resp = redis_client
        .hset::<_, _, _, i32>(
            key,
            email,
            faster_hex::hex_string(digest(&SHA256, token.as_bytes()).as_ref()),
        )
        .await?
        == 1;

    redis_client
        .hexpire::<_, _, ()>(key, 3600, redis::ExpireOption::NONE, vec![email])
        .await?;

    Ok(resp)
}

pub async fn check(
    email: &str,
    token: &str,
    key: HashKey,
    redis_client: &mut PooledConnection<'_, RedisConnectionManager>,
) -> Result<bool> {
    let resp = redis_client.hget::<_, _, Value>(key, email).await?;

    match resp {
        Value::Nil => Ok(false),
        Value::BulkString(s) => {
            Ok(s == faster_hex::hex_string(digest(&SHA256, token.as_bytes()).as_ref()).as_bytes())
        }
        _ => unreachable!(),
    }
}
