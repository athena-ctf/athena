use std::future::Future;

use sqlx::error::Error;
use sqlx::postgres::PgListener;
use sqlx::{Pool, Postgres};

pub async fn start_listening<F, Fut>(pool: &Pool<Postgres>, call_back: F) -> Result<(), Error>
where
    F: Fn(entity::notification::Model) -> Fut + Send + Sync,
    Fut: Future<Output = ()> + Send,
{
    let mut listener = PgListener::connect_with(pool).await.unwrap();
    listener.listen(crate::CHANNEL_NAME).await?;
    loop {
        while let Some(notification) = listener.try_recv().await? {
            tracing::info!(
                "received notification from channel {:?}",
                notification.channel()
            );

            let payload = notification.payload().to_owned();
            let payload = serde_json::from_str::<entity::notification::Model>(&payload).unwrap();

            call_back(payload).await;
        }
    }
}
