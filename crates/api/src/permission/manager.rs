use std::collections::HashMap;

use axum::http::Method;
use fred::prelude::*;
use uuid::Uuid;

use crate::errors::Result;

fn role_key(role: String) -> String {
    format!("roles:{role}")
}

fn override_key(id: Uuid) -> String {
    format!("roles:overrides:{}", id.simple())
}

pub struct Manager {
    pub redis_pool: Pool,
    pub url_mappings: HashMap<(Method, String), String>,
}

impl Manager {
    pub async fn new(
        redis_pool: Pool,
        roles: HashMap<String, Vec<String>>,
        url_mappings: HashMap<(Method, String), String>,
    ) -> Result<Self> {
        for (role, permissions) in roles {
            redis_pool.sadd::<(), _, _>(role_key(role), permissions).await?;
        }

        Ok(Self {
            redis_pool,
            url_mappings,
        })
    }

    pub async fn can_do_action(&self, method: Method, url: String, role: String, id: Uuid) -> Result<bool> {
        let permission = &self.url_mappings[&(method, url)];

        Ok(self
            .redis_pool
            .sismember::<bool, _, _>(role_key(role), permission)
            .await?
            || self.redis_pool.sismember(override_key(id), permission).await?)
    }

    pub async fn add_role_permissions(&self, role: String, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.sadd(role_key(role), permissions).await?)
    }

    pub async fn add_override_permission(&self, id: Uuid, permission: String) -> Result<()> {
        Ok(self.redis_pool.sadd(override_key(id), permission).await?)
    }

    pub async fn remove_role_permissions(&self, role: String, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.srem(role_key(role), permissions).await?)
    }

    pub async fn remove_override_permission(&self, id: Uuid, permission: String) -> Result<()> {
        Ok(self.redis_pool.srem(override_key(id), permission).await?)
    }

    pub async fn remove_role(&self, role: String) -> Result<()> {
        Ok(self.redis_pool.del(role_key(role)).await?)
    }

    pub async fn remove_override(&self, id: Uuid) -> Result<()> {
        Ok(self.redis_pool.del(override_key(id)).await?)
    }
}
