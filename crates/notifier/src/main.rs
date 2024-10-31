use std::collections::HashMap;
use std::sync::LazyLock;

use async_stream::stream;
use axum::response::sse::{Event, KeepAlive};
use axum::response::Sse;
use axum::routing::get;
use axum::{Error, Extension, Router};
use futures::Stream;
use sqlx::error::Error as SqlxError;
use sqlx::postgres::PgListener;
use sqlx::{Pool, Postgres};
use tokio::net::TcpListener;
use tokio::sync::mpsc::{self, Sender};
use tokio::sync::RwLock;
use tower_http::trace::TraceLayer;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use uuid::Uuid;

static CONNECTED_CLIENTS: LazyLock<RwLock<HashMap<Uuid, Sender<entity::notification::Model>>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));

pub async fn start_listening(channel_name: &str, pool: &Pool<Postgres>) -> Result<(), SqlxError> {
    let mut listener = PgListener::connect_with(pool).await.unwrap();
    listener.listen(channel_name).await?;
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

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();
    let settings = config::Settings::new(&std::env::args().nth(1).unwrap()).unwrap();

    let pool = sqlx::PgPool::connect(&settings.db_url()).await.unwrap();

    start_listening(&settings.database.listener_channel, &pool)
        .await
        .unwrap();

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    let app = Router::new()
        .route("/", get(sse_handler))
        .layer(TraceLayer::new_for_http());

    tracing::debug!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}

async fn call_back(model: entity::notification::Model) {
    let value = CONNECTED_CLIENTS
        .read()
        .await
        .get(&model.player_id)
        .cloned();
    if let Some(tx) = value {
        tx.send(model).await.unwrap();
    }
}

async fn sse_handler(
    Extension(id): Extension<Uuid>,
) -> Sse<impl Stream<Item = Result<Event, Error>>> {
    let (tx, mut rx) = mpsc::channel::<entity::notification::Model>(100);

    CONNECTED_CLIENTS.write().await.insert(id, tx);

    let stream = stream! {
        while let Some(notification) = rx.recv().await {
            yield Event::default().json_data(notification)
        }
    };

    Sse::new(stream).keep_alive(KeepAlive::new())
}
