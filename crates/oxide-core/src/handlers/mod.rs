pub mod achievement;
pub mod admin;
pub mod auth;
pub mod ban;
pub mod challenge;
pub mod challenge_file;
pub mod challenge_tag;
pub mod container;
pub mod deployment;
pub mod file;
pub mod flag;
pub mod hint;
pub mod instance;
pub mod invite;
pub mod leaderboard;
pub mod notification;
pub mod player;
pub mod player_achievement;
pub mod settings;
pub mod stats;
pub mod submission;
pub mod tag;
pub mod team;
pub mod ticket;
pub mod unlock;

use std::collections::HashMap;

use fred::prelude::*;
use futures::Stream;
use sea_orm::prelude::*;
use sea_orm::{Iterable, QuerySelect};
use tempfile::NamedTempFile;
use tokio::fs::File;
use tokio::io::BufReader;
use tokio_util::io::ReaderStream;

use crate::errors::Result;
use crate::schemas::{
    Achievement, AchievementsReceived, Challenge, PlayerModel, PlayerProfile, Tag, TagSolves,
};

pub async fn retrieve_profile(
    player: PlayerModel,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let rank = pool
        .zrevrank("leaderboard:player", &player.id.simple().to_string())
        .await?;

    let score = pool
        .zscore("leaderboard:player", &player.id.simple().to_string())
        .await?;

    let mut tags_map = Tag::find()
        .all(db)
        .await?
        .into_iter()
        .map(|tag| {
            (
                tag.id,
                TagSolves {
                    tag_value: tag.value,
                    solves: 0,
                },
            )
        })
        .collect::<HashMap<_, _>>();

    let solved_challenges = player
        .find_related(Challenge)
        .filter(entity::submission::Column::IsCorrect.eq(true))
        .all(db)
        .await?;

    for submitted_challenge in &solved_challenges {
        let tags = submitted_challenge.find_related(Tag).all(db).await?;
        for tag in tags {
            tags_map
                .entry(tag.id)
                .and_modify(|tag_solves| tag_solves.solves += 1);
        }
    }

    let achievements = player
        .find_related(Achievement)
        .select_only()
        .columns(entity::achievement::Column::iter())
        .column(entity::player_achievement::Column::Count)
        .into_model::<AchievementsReceived>()
        .all(db)
        .await?;
    let tag_solves = tags_map.values().cloned().collect();

    Ok(PlayerProfile {
        player,
        solved_challenges,
        achievements,
        tag_solves,
        rank,
        score,
    })
}

struct CsvStream {
    _temp_file: NamedTempFile, // This ensures the file is deleted when dropped
    stream: ReaderStream<BufReader<File>>,
}

impl CsvStream {
    async fn new(temp_file: NamedTempFile) -> std::io::Result<Self> {
        let file = File::open(temp_file.path()).await?;
        let reader = BufReader::new(file);
        let stream = ReaderStream::new(reader);

        Ok(Self {
            _temp_file: temp_file,
            stream,
        })
    }
}

impl Stream for CsvStream {
    type Item = std::io::Result<bytes::Bytes>;

    fn poll_next(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Option<Self::Item>> {
        std::pin::Pin::new(&mut self.stream).poll_next(cx)
    }
}
