use std::iter::repeat_with;
use std::time::Duration;

use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use chrono::{DateTime, Utc};
use config::{Config, File};
use indexmap::IndexMap;
use lettre::message::Mailbox;
use lettre::Address;
use serde::{Deserialize, Serialize};

use crate::errors::Result;

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

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Ctf {
    pub name: String,
    pub domain: String,
    pub description: String,
    pub time: Time,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub challenge: Option<Challenge>,
    pub sponsors: IndexMap<String, Vec<Sponsor>>,
    pub prizes: IndexMap<String, Vec<String>>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Sponsor {
    name: String,
    logo: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Time {
    #[serde(with = "human_duration")]
    pub span: Duration,
    pub start: DateTime<Utc>,
    #[serde(with = "human_duration")]
    pub freeze: Duration,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Database {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct RedisInner {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Redis {
    pub cache: RedisInner,
    pub token: RedisInner,
}

fn default_region() -> String {
    "ap-south-1".to_owned()
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct AwsS3 {
    #[serde(default = "default_region")]
    pub region: String,
    pub access_key_id: String,
    pub secret_access_key: String,
    pub bucket_name: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Jwt {
    pub secret: String,
    pub access_token_timeout: u64,
    pub refresh_token_timeout: u64,
}

#[derive(Debug, Deserialize, Serialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum CompressionKind {
    Gzip,
    Zstd,
    Br,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct StaticServer {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub compress: Option<CompressionKind>,
    pub path: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Smtp {
    pub from: Mailbox,
    pub reply_to: Mailbox,
    pub username: String,
    pub password: String,
    pub server_url: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Challenge {
    pub max_attempts: usize,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Docker {
    pub single_instance_duration: usize,
    pub registry_url: String,
    pub registry_username: String,
    pub registry_password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FileStorage {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub aws_s3: Option<AwsS3>,

    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub static_server: Option<StaticServer>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Discord {
    pub welcome_channel_id: String,
    pub editor_role_id: String,
    pub viewer_role_id: String,
    pub reaction_role_message_id: String,
    pub logs_channel_id: String,
    pub genral_channel_id: String,
    pub bot_token: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Settings {
    pub ctf: Ctf,
    pub database: Database,
    pub redis: Redis,
    pub file_storage: FileStorage,
    pub jwt: Jwt,
    pub smtp: Smtp,
    pub docker: Docker,
    pub discord: Discord,
}

fn gen_random_password() -> String {
    std::iter::repeat_with(fastrand::alphanumeric)
        .take(12)
        .collect()
}

const DB_NAME: &str = "athena_db";

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
                challenge: Some(Challenge { max_attempts: 10 }),
                sponsors: IndexMap::new(),
                prizes: IndexMap::new(),
            },
            database: Database {
                host: "postgres".to_owned(),
                port: 5432,
                username: "postgres".to_owned(),
                password: gen_random_password(),
            },
            redis: Redis {
                cache: RedisInner {
                    host: "redis".to_owned(),
                    port: 6379,
                    username: "redis_cache".to_owned(),
                    password: gen_random_password(),
                },
                token: RedisInner {
                    host: "redis".to_owned(),
                    port: 6379,
                    username: "redis_token".to_owned(),
                    password: gen_random_password(),
                },
            },
            jwt: Jwt {
                secret: BASE64_STANDARD.encode(
                    repeat_with(|| fastrand::u8(0..=255))
                        .take(32)
                        .collect::<Vec<_>>(),
                ),
                access_token_timeout: 600,
                refresh_token_timeout: 86400,
            },
            file_storage: FileStorage {
                aws_s3: Some(AwsS3 {
                    region: "ap-south-1".to_owned(),
                    access_key_id: "<aws-access-key-id>".to_owned(),
                    secret_access_key: "<aws-secret-access-key>".to_owned(),
                    bucket_name: "athena_bucket".to_owned(),
                }),
                static_server: Some(StaticServer {
                    compress: Some(CompressionKind::Gzip),
                    path: "/var/athena/static".to_owned(),
                }),
            },
            smtp: Smtp {
                from: Mailbox::new(None, Address::new("noreply", "athena.io").unwrap()),
                reply_to: Mailbox::new(
                    Some("Admin".to_owned()),
                    Address::new("admin", "athena.io").unwrap(),
                ),
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
                genral_channel_id: String::new(),
                bot_token: String::new(),
            },
        }
    }
}

impl Settings {
    pub fn new(location: &str) -> Result<Self> {
        let s = Config::builder()
            .add_source(File::with_name(location))
            .build()?;

        let settings = s.try_deserialize()?;

        Ok(settings)
    }

    pub fn db_url(&self) -> String {
        format!(
            "postgres://{}:{}@{}:{}/{}",
            self.database.username,
            self.database.password,
            self.database.host,
            self.database.port,
            DB_NAME
        )
    }
}
