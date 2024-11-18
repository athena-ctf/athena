use reqwest::Client as HttpClient;
use serde_json::json;

use crate::errors::Result;

pub struct CaddyApi {
    client: HttpClient,
    api_url: String,
    base_url: String,
}

impl CaddyApi {
    pub fn new(caddy_api_url: String, base_url: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            api_url: caddy_api_url,
            base_url,
        }
    }

    pub async fn register(
        &self,
        host_name: &str,
        host_port: &str,
        container_name: &str,
        container_port: &str,
    ) -> Result<()> {
        let route_config = json!({
            "listen": [format!(":{host_port}")],
            "routes": [{
                "handle": [{
                    "handler": "subroute",
                    "routes": [{
                        "handle": [{
                            "handler": "reverse_proxy",
                            "upstreams": [{
                                "dial": format!("{container_name}:{container_port}")
                            }]
                        }]
                    }]
                }],
                "match": [{
                    "host": [format!("{host_name}.{}", self.base_url)],
                }],
                "terminal": true
            }]
        });

        self.client
            .put(format!(
                "{}/config/apps/http/servers/{host_name}_{container_name}",
                self.api_url
            ))
            .json(&route_config)
            .send()
            .await?;

        Ok(())
    }

    pub async fn remove(&self, hostname: &str, container_name: &str) -> Result<()> {
        self.client
            .delete(format!(
                "{}/config/apps/http/servers/{hostname}_{container_name}",
                self.api_url
            ))
            .send()
            .await?;

        Ok(())
    }
}
