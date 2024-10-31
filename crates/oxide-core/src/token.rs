use fred::prelude::*;
use fred::types::RedisMap;
use ring::digest::{digest, SHA256};

use crate::errors::Result;

pub struct TokenManager {
    pub redis: RedisPool,
    pub max_retries: u8,
    pub expiration_duration: i64,
}

pub struct TokenValue {
    token: Vec<u8>,
    retries: i64,
}

impl TryInto<RedisMap> for TokenValue {
    type Error = RedisError;

    fn try_into(self) -> std::result::Result<RedisMap, Self::Error> {
        let mut map = RedisMap::new();
        map.insert("token".into(), RedisValue::Bytes(self.token.into()));
        map.insert("retries".into(), self.retries.into());

        Ok(map)
    }
}

impl FromRedis for TokenValue {
    fn from_value(value: RedisValue) -> std::result::Result<Self, RedisError> {
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

impl TokenManager {
    pub async fn generate(&self, key: &str, email: &str) -> Result<String> {
        let token = std::iter::repeat_with(fastrand::alphanumeric)
            .take(8)
            .collect::<String>();

        let hashed_token = digest(&SHA256, token.as_bytes()).as_ref().to_vec();

        self.redis
            .hset::<(), _, _>(
                format!("{key}:{email}"),
                TokenValue {
                    token: hashed_token,
                    retries: self.max_retries.into(),
                },
            )
            .await?;

        self.redis
            .expire::<(), _>(format!("{key}:{email}"), self.expiration_duration)
            .await?;

        Ok(token)
    }

    pub async fn verify(
        &self,
        key: &str,
        email: &str,
        token: &str,
    ) -> Result<TokenVerificationResult> {
        if let Some(token_value) = self
            .redis
            .hgetall::<Option<TokenValue>, _>(format!("{key}:{email}"))
            .await?
        {
            if token_value.retries == 0 {
                self.redis.del::<(), _>(format!("{key}:{email}")).await?;
                return Ok(TokenVerificationResult::RetiesExceeded);
            }

            Ok(
                if token_value.token == digest(&SHA256, token.as_bytes()).as_ref() {
                    self.redis.del::<(), _>(format!("{key}:{email}")).await?;

                    TokenVerificationResult::Valid
                } else {
                    self.redis
                        .hincrby::<(), _, _>(format!("{key}:{email}"), "retries", -1)
                        .await?;

                    TokenVerificationResult::Invalid
                },
            )
        } else {
            Ok(TokenVerificationResult::Invalid)
        }
    }
}
