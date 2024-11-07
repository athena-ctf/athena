use std::error::Error;
use std::iter::repeat_with;
use std::time::Duration;

use base64ct::{Base64, Encoding};
use chrono::{DateTime, Utc};
use config_rs::{Config, File};
use indexmap::IndexMap;
use schemars::gen::SchemaSettings;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

mod human_duration {
    use std::time::Duration;

    use serde::{self, Deserialize, Deserializer, Serializer};

    pub fn serialize<S>(duration: &Duration, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let s = humantime::format_duration(*duration).to_string();
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Duration, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        humantime::parse_duration(&s).map_err(serde::de::Error::custom)
    }
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Ctf {
    pub name: String,
    pub domain: String,
    pub description: String,
    pub time: Time,
    pub sponsors: IndexMap<String, Vec<Sponsor>>,
    pub prizes: IndexMap<String, Vec<String>>,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Sponsor {
    name: String,
    logo: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Time {
    #[serde(
        serialize_with = "human_duration::serialize",
        deserialize_with = "human_duration::deserialize"
    )]
    #[schemars(with = "String")]
    pub span: Duration,
    pub start: DateTime<Utc>,
    #[serde(
        serialize_with = "human_duration::serialize",
        deserialize_with = "human_duration::deserialize"
    )]
    #[schemars(with = "String")]
    pub freeze: Duration,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
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

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct RedisInner {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Redis {
    pub cache: RedisInner,
    pub persistent: RedisInner,
}

fn default_region() -> String {
    "ap-south-1".to_owned()
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct AwsS3 {
    #[serde(default = "default_region")]
    pub region: String,
    pub access_key_id: String,
    pub secret_access_key: String,
    pub bucket_name: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Jwt {
    pub secret: String,
    pub access_token_timeout: u64,
    pub refresh_token_timeout: u64,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum CompressionKind {
    Gzip,
    Zstd,
    Br,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Local {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub compress: Option<CompressionKind>,
    pub path: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Aws {}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Gcp {}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Azure {
    account_name: String,
    account_key: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct RemoteStorageOptions {
    bucket_name: String,
    expires: i32,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct FileStorage {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub remote_storage_options: Option<RemoteStorageOptions>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub local: Option<Local>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub aws: Option<Aws>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub gcp: Option<Gcp>,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub azure: Option<Azure>,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Smtp {
    pub from: String,
    pub reply_to: String,
    pub username: String,
    pub password: String,
    pub server_url: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Challenge {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub max_attempts: Option<usize>,
    pub container_registry: String,
    pub registry_username: String,
    pub registry_password: String,
    pub container_timeout: i64,
    pub player_flag_len: usize,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Docker {
    pub single_instance_duration: usize,
    pub registry_url: String,
    pub registry_username: String,
    pub registry_password: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Discord {
    pub welcome_channel_id: String,
    pub editor_role_id: String,
    pub viewer_role_id: String,
    pub reaction_role_message_id: String,
    pub logs_channel_id: String,
    pub general_channel_id: String,
    pub bot_token: String,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Token {
    pub max_retries: u8, // Max 256 retries
    pub token_expiry_in_secs: i64,
}

#[derive(Debug, Deserialize, Serialize, JsonSchema, Clone)]
pub struct Settings {
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
    std::iter::repeat_with(fastrand::alphanumeric)
        .take(12)
        .collect()
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            ctf: Ctf {
                name: "Athena CTF".to_owned(),
                domain: "athena.io".to_owned(),
                description: "Athena is a hosted platform for CTFs".to_owned(),
                time: Time {
                    span: Duration::from_secs(2 * 24 * 60 * 60),
                    freeze: Duration::from_secs(24 * 60 * 60),
                    start: Utc::now(),
                },
                sponsors: IndexMap::new(),
                prizes: IndexMap::new(),
            },
            database: Database {
                host: "postgres".to_owned(),
                port: 5432,
                username: "postgres".to_owned(),
                password: gen_random_password(),
                listener_channel: "notification_insert".to_owned(),
                database_name: "athena_db".to_owned(),
            },
            redis: Redis {
                cache: RedisInner {
                    host: "redis_cache".to_owned(),
                    port: 6379,
                    username: "redis_cache".to_owned(),
                    password: gen_random_password(),
                },
                persistent: RedisInner {
                    host: "redis_token".to_owned(),
                    port: 6379,
                    username: "redis_token".to_owned(),
                    password: gen_random_password(),
                },
            },
            jwt: Jwt {
                secret: Base64::encode_string(
                    &repeat_with(|| fastrand::u8(0..=255))
                        .take(32)
                        .collect::<Vec<_>>(),
                ),
                access_token_timeout: 600,
                refresh_token_timeout: 86400,
            },
            file_storage: FileStorage {
                remote_storage_options: None,
                local: Some(Local {
                    compress: Some(CompressionKind::Gzip),
                    path: "/var/athena/static".to_owned(),
                }),
                aws: None,
                azure: None,
                gcp: None,
            },
            smtp: Smtp {
                from: "noreply@athena.io".to_owned(),
                reply_to: "admin@athena.io".to_owned(),
                username: "athena_smtp".to_owned(),
                password: gen_random_password(),
                server_url: "smtp.athena.io".to_owned(),
            },
            docker: Docker {
                single_instance_duration: 15,
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
                max_attempts: None,
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
            .build()?;

        let settings = s.try_deserialize()?;

        Ok(settings)
    }

    pub fn default_json(&self) -> Result<String, serde_json::Error> {
        serde_json::to_string_pretty(self)
    }

    pub fn json_schema() -> Result<String, serde_json::Error> {
        let schema = SchemaSettings::default()
            .with(|s| s.option_add_null_type = false)
            .into_generator()
            .into_root_schema_for::<Self>();
        serde_json::to_string_pretty(&schema)
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

impl RedisInner {
    pub fn url(&self) -> String {
        format!(
            "redis://{}:{}@{}:{}",
            self.username, self.password, self.host, self.port
        )
    }
}
