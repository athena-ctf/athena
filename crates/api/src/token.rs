use fred::clients::Pool;
use fred::error::Error;
use fred::interfaces::{HashesInterface, KeysInterface};
use fred::types::{FromValue, Map, Value as RedisValue};
use ring::digest::{SHA256, digest};

use crate::errors::Result;

pub fn token_key(key: &str, email: &str) -> String {
    format!("token:{key}:{email}")
}

pub struct Manager {
    pub redis_pool: Pool,
    pub max_retries: u8,
    pub expiration_duration: i64,
}

pub struct Value {
    token: Vec<u8>,
    retries: i64,
}

impl TryInto<Map> for Value {
    type Error = Error;

    fn try_into(self) -> std::result::Result<Map, Self::Error> {
        let mut map = Map::new();
        map.insert("token".into(), RedisValue::Bytes(self.token.into()));
        map.insert("retries".into(), self.retries.into());

        Ok(map)
    }
}

impl FromValue for Value {
    fn from_value(value: RedisValue) -> std::result::Result<Self, Error> {
        let value = value.into_map()?;

        Ok(Self {
            token: value[&"token".into()].as_bytes().unwrap().to_vec(),
            retries: value[&"retries".into()].as_i64().unwrap(),
        })
    }
}

#[derive(Clone, Copy)]
pub enum TokenVerificationResult {
    Valid,
    RetiesExceeded,
    Invalid,
}

impl TokenVerificationResult {
    pub const fn is_valid(self) -> bool {
        matches!(self, Self::Valid)
    }

    pub const fn is_invalid(self) -> bool {
        matches!(self, Self::Invalid)
    }

    pub const fn is_retries_exceeded(self) -> bool {
        matches!(self, Self::RetiesExceeded)
    }
}

impl Manager {
    pub fn new(redis_pool: Pool, max_retries: u8, expiration_duration: i64) -> Self {
        Self {
            redis_pool,
            max_retries,
            expiration_duration,
        }
    }

    pub async fn generate(&self, key: &str, email: &str) -> Result<String> {
        let token = crate::utils::gen_random(8);

        let hashed_token = digest(&SHA256, token.as_bytes()).as_ref().to_vec();

        self.redis_pool
            .hset::<(), _, _>(token_key(key, email), Value {
                token: hashed_token,
                retries: self.max_retries.into(),
            })
            .await?;

        self.redis_pool
            .expire::<(), _>(token_key(key, email), self.expiration_duration, None)
            .await?;

        Ok(token)
    }

    pub async fn verify(&self, key: &str, email: &str, token: &str) -> Result<TokenVerificationResult> {
        if let Some(token_value) = self
            .redis_pool
            .hgetall::<Option<Value>, _>(token_key(key, email))
            .await?
        {
            if token_value.retries == 0 {
                self.redis_pool.del::<(), _>(token_key(key, email)).await?;
                return Ok(TokenVerificationResult::RetiesExceeded);
            }

            Ok(if token_value.token == digest(&SHA256, token.as_bytes()).as_ref() {
                self.redis_pool.del::<(), _>(token_key(key, email)).await?;

                TokenVerificationResult::Valid
            } else {
                self.redis_pool
                    .hincrby::<(), _, _>(token_key(key, email), "retries", -1)
                    .await?;

                TokenVerificationResult::Invalid
            })
        } else {
            Ok(TokenVerificationResult::Invalid)
        }
    }
}
