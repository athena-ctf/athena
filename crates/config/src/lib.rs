use std::error::Error;
use std::iter::repeat_with;

use api_macros::JsonPath;
use base64ct::{Base64, Encoding};
use chrono::{DateTime, Days, Utc};
use config_rs::{Config, File};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use serde_json::Value;

mod json_path;

pub use json_path::JsonPath;

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Level {
    value: i32,
    name: String,
    color: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Ctf {
    pub name: String,
    pub domain: String,
    pub description: String,
    pub time: Time,
    pub sponsors: IndexMap<String, Vec<Sponsor>>,
    pub prizes: IndexMap<String, Vec<String>>,
    pub levels: Vec<Level>,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Sponsor {
    name: String,
    logo: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Time {
    pub end: DateTime<Utc>,
    pub start: DateTime<Utc>,
    pub freeze: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Database {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
    pub listener_channel: String,
    #[serde(default = "athena_db")]
    pub database_name: String,
}

fn athena_db() -> String {
    "athena_db".to_owned()
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Redis {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Jwt {
    pub secret: String,
    pub access_expiry_duration: u64,
    pub refresh_expiry_duration: u64,
}

#[derive(Debug, Deserialize, Serialize, Clone, Copy, JsonPath)]
#[serde(rename_all = "lowercase")]
pub enum CompressionKind {
    Gzip,
    Zstd,
    Br,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Local {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub compress: Option<CompressionKind>,
    pub path: String,
}

fn default_region() -> String {
    "ap-south-1".to_owned()
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct AwsS3 {
    #[serde(default = "default_region")]
    pub region: String,
    pub access_key_id: String,
    pub secret_access_key: String,
    pub bucket_name: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct FileStorage {
    pub local: Local,
    pub backup: AwsS3,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Smtp {
    pub from: String,
    pub reply_to: String,
    pub username: String,
    pub password: String,
    pub server_url: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Challenge {
    pub container_registry: String,
    pub registry_username: String,
    pub registry_password: String,
    pub container_timeout: u64,
    pub player_flag_len: usize,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Docker {
    pub registry_url: String,
    pub registry_username: String,
    pub registry_password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Discord {
    pub welcome_channel_id: String,
    pub editor_role_id: String,
    pub viewer_role_id: String,
    pub reaction_role_message_id: String,
    pub logs_channel_id: String,
    pub general_channel_id: String,
    pub bot_token: String,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Token {
    pub max_retries: u8, // Max 256 retries
    pub token_expiry_in_secs: i64,
}

#[derive(Debug, Deserialize, Serialize, Clone, JsonPath)]
pub struct Settings {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub location: Option<String>,
    pub ctf: Ctf,
    pub database: Database,
    pub redis: Redis,
    pub file_storage: FileStorage,
    pub jwt: Jwt,
    pub smtp: Smtp,
    pub docker: Docker,
    pub discord: Discord,
    pub token: Token,
    pub challenge: Challenge,
}

fn gen_random_password() -> String {
    std::iter::repeat_with(fastrand::alphanumeric).take(12).collect()
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            location: None,
            ctf: Ctf {
                name: "Athena CTF".to_owned(),
                domain: "athena.io".to_owned(),
                description: "Athena is a hosted platform for CTFs".to_owned(),
                time: Time {
                    end: Utc::now().checked_add_days(Days::new(2)).unwrap(),
                    freeze: Utc::now().checked_add_days(Days::new(3)).unwrap(),
                    start: Utc::now(),
                },
                sponsors: IndexMap::new(),
                prizes: IndexMap::new(),
                levels: vec![
                    Level {
                        value: 0,
                        name: "Very Easy".to_owned(),
                        color: "#23332b".to_owned(),
                    },
                    Level {
                        value: 1,
                        name: "Easy".to_owned(),
                        color: "#059c50".to_owned(),
                    },
                    Level {
                        value: 2,
                        name: "Medium".to_owned(),
                        color: "#d0d40f".to_owned(),
                    },
                    Level {
                        value: 3,
                        name: "Hard".to_owned(),
                        color: "#d4290f".to_owned(),
                    },
                ],
            },
            database: Database {
                host: "postgres".to_owned(),
                port: 5432,
                username: "postgres".to_owned(),
                password: gen_random_password(),
                listener_channel: "athena_db_modification".to_owned(),
                database_name: "athena_db".to_owned(),
            },
            redis: Redis {
                host: "redis".to_owned(),
                port: 6379,
                username: "redis".to_owned(),
                password: gen_random_password(),
            },
            jwt: Jwt {
                secret: Base64::encode_string(&repeat_with(|| fastrand::u8(0..=255)).take(32).collect::<Vec<_>>()),
                access_expiry_duration: 600,
                refresh_expiry_duration: 86400,
            },
            file_storage: FileStorage {
                local: Local {
                    compress: Some(CompressionKind::Gzip),
                    path: "/var/athena/static".to_owned(),
                },
                backup: AwsS3 {
                    region: default_region(),
                    access_key_id: "".to_owned(),
                    secret_access_key: "".to_owned(),
                    bucket_name: "athena_file_backup".to_owned(),
                },
            },
            smtp: Smtp {
                from: "noreply@athena.io".to_owned(),
                reply_to: "admin@athena.io".to_owned(),
                username: "athena_smtp".to_owned(),
                password: gen_random_password(),
                server_url: "smtp.athena.io".to_owned(),
            },
            docker: Docker {
                registry_url: "registry.athena.io".to_owned(),
                registry_username: "athena".to_owned(),
                registry_password: gen_random_password(),
            },
            discord: Discord {
                welcome_channel_id: String::new(),
                editor_role_id: String::new(),
                viewer_role_id: String::new(),
                reaction_role_message_id: String::new(),
                logs_channel_id: String::new(),
                general_channel_id: String::new(),
                bot_token: String::new(),
            },
            token: Token {
                max_retries: 10,
                token_expiry_in_secs: 3600,
            },
            challenge: Challenge {
                container_registry: "registry.athena.io".to_owned(),
                registry_username: "athena".to_owned(),
                registry_password: gen_random_password(),
                container_timeout: 900,
                player_flag_len: 20,
            },
        }
    }
}

impl Settings {
    pub fn new(location: &str) -> Result<Self, Box<dyn Error>> {
        let s = Config::builder()
            .add_source(File::with_name(location))
            .set_override("location", location)?
            .build()?;

        let settings = s.try_deserialize()?;

        Ok(settings)
    }

    pub fn default_json(&self) -> Result<String, serde_json::Error> {
        serde_json::to_string_pretty(self)
    }
}

impl Database {
    pub fn url(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}/{}",
            self.username, self.password, self.host, self.port, self.database_name
        )
    }
}

impl Redis {
    pub fn url(&self) -> String {
        format!(
            "redis://{}:{}@{}:{}",
            self.username, self.password, self.host, self.port
        )
    }
}
