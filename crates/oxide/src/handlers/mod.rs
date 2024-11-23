pub mod admin;
pub mod auth;
pub mod award;
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
pub mod player_award;
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
use crate::redis_keys::{player_history_key, PLAYER_LEADERBOARD};
use crate::schemas::{
    Award, AwardsReceived, Challenge, PlayerModel, PlayerProfile, PointsHistory, Tag, TagSolves,
};

pub async fn retrieve_profile(
    player: PlayerModel,
    db: &DbConn,
    pool: &RedisPool,
) -> Result<PlayerProfile> {
    let rank = pool
        .zrevrank(PLAYER_LEADERBOARD, &player.id.simple().to_string())
        .await?;

    let score = pool
        .zscore(PLAYER_LEADERBOARD, &player.id.simple().to_string())
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

    let awards = player
        .find_related(Award)
        .select_only()
        .columns(entity::award::Column::iter())
        .column(entity::player_award::Column::Count)
        .into_model::<AwardsReceived>()
        .all(db)
        .await?;
    let tag_solves = tags_map.values().cloned().collect();
    let history = pool
        .lrange::<Vec<String>, _>(player_history_key(player.id), 0, -1)
        .await?
        .into_iter()
        .map(|hist_entry| PointsHistory::parse(&hist_entry))
        .collect();

    Ok(PlayerProfile {
        player,
        solved_challenges,
        awards,
        tag_solves,
        rank,
        score,
        history,
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
