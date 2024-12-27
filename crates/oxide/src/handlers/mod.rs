pub mod admin;
pub mod award;
pub mod ban;
pub mod challenge;
pub mod challenge_file;
pub mod container;
pub mod deployment;
pub mod docker;
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
pub mod submission;
pub mod team;
pub mod ticket;
pub mod unlock;

pub mod auth {
    pub mod admin;
    pub mod player;
}

use futures::Stream;
use tempfile::NamedTempFile;
use tokio::fs::File;
use tokio::io::BufReader;
use tokio_util::io::ReaderStream;

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
