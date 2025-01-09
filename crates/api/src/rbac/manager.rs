use std::collections::HashMap;

use axum::http::Method;
use fred::prelude::*;
use uuid::Uuid;

use crate::errors::Result;

fn role_key(role: &str) -> String {
    format!("rbac:role:{role}")
}

fn override_key(id: Uuid) -> String {
    format!("rbac:override:{}", id.simple())
}

const ROLES_LIST_KEY: &str = "rbac:roles";
const OVERRIDES_LIST_KEY: &str = "rbac:overrides";

pub struct Manager {
    pub redis_pool: Pool,
    pub url_mappings: HashMap<(Method, String), String>,
    pub rbac: Vec<String>,
}

impl Manager {
    pub async fn new(
        redis_pool: Pool,
        roles: HashMap<String, Vec<String>>,
        url_mappings: HashMap<(Method, String), String>,
    ) -> Result<Self> {
        for (role, permissions) in roles {
            redis_pool.sadd::<(), _, _>(role_key(&role), permissions).await?;
        }

        Ok(Self {
            redis_pool,
            rbac: url_mappings.values().cloned().collect(),
            url_mappings,
        })
    }

    pub async fn can_do_action(&self, method: Method, url: String, role: String, id: Uuid) -> Result<bool> {
        let permission = &self.url_mappings[&(method, url)];

        Ok(self
            .redis_pool
            .sismember::<bool, _, _>(role_key(&role), permission)
            .await?
            || self.redis_pool.sismember(override_key(id), permission).await?)
    }

    pub async fn list_roles(&self) -> Result<Vec<(String, Vec<String>)>> {
        let role_names = self.redis_pool.smembers::<Vec<String>, _>(ROLES_LIST_KEY).await?;
        let mut roles = Vec::with_capacity(role_names.len());

        for role_name in role_names {
            let permissions = self.redis_pool.smembers(role_key(&role_name)).await?;
            roles.push((role_name, permissions));
        }

        Ok(roles)
    }

    pub async fn list_overrides(&self) -> Result<Vec<(Uuid, Vec<String>)>> {
        let override_ids = self.redis_pool.smembers::<Vec<String>, _>(OVERRIDES_LIST_KEY).await?;
        let mut overrides = Vec::with_capacity(override_ids.len());

        for override_id in override_ids {
            let override_id = override_id.parse::<Uuid>().unwrap();
            let permissions = self.redis_pool.smembers(override_key(override_id)).await?;
            overrides.push((override_id, permissions));
        }

        Ok(overrides)
    }

    pub async fn create_role(&self, role: String) -> Result<()> {
        Ok(self.redis_pool.sadd(ROLES_LIST_KEY, role).await?)
    }

    pub async fn create_override(&self, id: Uuid) -> Result<()> {
        Ok(self
            .redis_pool
            .sadd(OVERRIDES_LIST_KEY, id.simple().to_string())
            .await?)
    }

    pub async fn add_role_permissions(&self, role: String, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.sadd(role_key(&role), permissions).await?)
    }

    pub async fn add_override_permissions(&self, id: Uuid, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.sadd(override_key(id), permissions).await?)
    }

    pub async fn remove_role_permissions(&self, role: String, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.srem(role_key(&role), permissions).await?)
    }

    pub async fn remove_override_permissions(&self, id: Uuid, permissions: Vec<String>) -> Result<()> {
        Ok(self.redis_pool.srem(override_key(id), permissions).await?)
    }

    pub async fn remove_role(&self, role: String) -> Result<()> {
        Ok(self.redis_pool.del(role_key(&role)).await?)
    }

    pub async fn remove_override(&self, id: Uuid) -> Result<()> {
        Ok(self.redis_pool.del(override_key(id)).await?)
    }
}
