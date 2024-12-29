use reqwest::Client as HttpClient;
use serde_json::json;

use crate::errors::Result;

pub struct Api {
    client: HttpClient,
    url: String,
    base_url: String,
}

impl Api {
    pub fn new(url: String, base_url: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            url,
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
                            "handler": "proxy",
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
                "{}/config/apps/layer4/servers/{host_name}_{container_name}",
                self.url
            ))
            .json(&route_config)
            .send()
            .await?;

        Ok(())
    }

    pub async fn remove(&self, hostname: &str, container_name: &str) -> Result<()> {
        self.client
            .delete(format!(
                "{}/config/apps/layer4/servers/{hostname}_{container_name}",
                self.url
            ))
            .send()
            .await?;

        Ok(())
    }
}
