use std::iter::repeat_with;
use std::time::Duration;

use base64::prelude::BASE64_STANDARD;
use base64::Engine;
use chrono::{DateTime, Utc};
use config::{Config, File};
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
    #[serde(with = "human_duration")]
    pub duration: Duration,
    pub start_time: DateTime<Utc>,
    #[serde(with = "human_duration")]
    pub freeze_duration: Duration,
    pub domain_name: String,
    pub description: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Database {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Redis {
    pub host: String,
    pub port: u16,
    pub username: String,
    pub password: String,
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
pub struct Docker {
    pub single_instance_duration: usize,
    pub registry_url: String,
    pub registry_username: String,
    pub registry_password: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Services {
    pub api_server_port: u16,
    pub api_server_host: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct FileStorage {
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub aws_s3: Option<AwsS3>,

    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub static_server: Option<StaticServer>,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Settings {
    pub ctf: Ctf,
    pub database: Database,
    pub redis: Redis,
    pub services: Services,
    pub file_storage: FileStorage,
    pub jwt: Jwt,
    pub smtp: Smtp,
    pub docker: Docker,
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
                duration: Duration::from_secs(2 * 24 * 60 * 60),
                freeze_duration: Duration::from_secs(24 * 60 * 60),
                start_time: Utc::now(),
                domain_name: "athena.io".to_owned(),
                description: "Athena is a hosted platform for CTFs".to_owned(),
            },
            database: Database {
                host: "postgres".to_owned(),
                port: 5432,
                username: "postgres".to_owned(),
                password: gen_random_password(),
            },
            redis: Redis {
                host: "redis".to_owned(),
                port: 6379,
                username: "redis".to_owned(),
                password: gen_random_password(),
            },
            services: Services {
                api_server_port: 50050,
                api_server_host: "oxide".to_owned(),
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
            self.db_name()
        )
    }

    fn slugify(value: &str) -> String {
        let mut slug: Vec<u8> = Vec::with_capacity(value.len());
        let mut prev_is_dash = true;

        let mut push_char = |x: u8| match x {
            b'a'..=b'z' | b'0'..=b'9' => {
                prev_is_dash = false;
                slug.push(x);
            }
            b'A'..=b'Z' => {
                prev_is_dash = false;
                slug.push(x - b'A' + b'a');
            }
            _ => {
                if !prev_is_dash {
                    slug.push(b'_');
                    prev_is_dash = true;
                }
            }
        };

        for c in value.chars() {
            if c.is_ascii() {
                push_char(c as u8);
            } else {
                for &cx in deunicode::deunicode_char(c).unwrap_or("_").as_bytes() {
                    push_char(cx);
                }
            }
        }

        let mut string = String::from_utf8(slug).unwrap();
        if string.ends_with('_') {
            string.pop();
        }

        string.push_str("_db");

        string.shrink_to_fit();
        string
    }

    pub fn db_name(&self) -> String {
        Self::slugify(&self.ctf.name)
    }
}
