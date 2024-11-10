use std::sync::LazyLock;

use async_stream::stream;
use axum::response::sse::{Event, KeepAlive};
use axum::response::Sse;
use axum::routing::get;
use axum::{Error, Extension, Router};
use dashmap::DashMap;
use futures::Stream;
use sqlx::error::Error as SqlxError;
use sqlx::postgres::PgListener;
use sqlx::{Pool, Postgres};
use tokio::net::TcpListener;
use tokio::sync::mpsc::{self, Sender};
use tower_http::trace::TraceLayer;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use uuid::Uuid;

mod pg;

static CONNECTED_CLIENTS: LazyLock<DashMap<Uuid, Sender<entity::notification::Model>>> =
    LazyLock::new(DashMap::new);

pub async fn start_listening(channel_name: String, pool: Pool<Postgres>) -> Result<(), SqlxError> {
    let mut listener = PgListener::connect_with(&pool).await.unwrap();
    listener.listen(&channel_name).await?;

    loop {
        while let Some(pg_notification) = listener.try_recv().await? {
            tracing::info!(
                "received notification from channel {:?}",
                pg_notification.channel()
            );

            let payload = pg_notification.payload().to_owned();
            let payload = serde_json::from_str::<pg::Notification>(&payload)
                .unwrap()
                .into_model();

            if let Some(payload) = payload {
                if let Some(player_id) = payload.player_id {
                    send_direct_message(player_id, payload).await;
                } else {
                    broadcast_message(payload).await;
                }
            }
        }
    }
}

async fn send_direct_message(player_id: Uuid, model: entity::notification::Model) {
    if let Some(tx) = CONNECTED_CLIENTS.get(&player_id) {
        let _ = tx.send(model).await;
    }
}

async fn broadcast_message(model: entity::notification::Model) {
    for client in CONNECTED_CLIENTS.iter() {
        let _ = client.value().send(model.clone()).await;
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer())
        .init();
    let settings = config::Settings::new(&std::env::args().nth(1).unwrap()).unwrap();

    let pool = sqlx::PgPool::connect(&settings.database.url())
        .await
        .unwrap();

    let listener_handle = tokio::spawn(start_listening(settings.database.listener_channel, pool));

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    let app = Router::new()
        .route("/", get(sse_handler))
        .layer(TraceLayer::new_for_http());

    tracing::debug!("listening on {}", listener.local_addr().unwrap());

    let server_handle = axum::serve(listener, app);

    tokio::select! {
        result = listener_handle => {
            if let Err(e) = result {
                tracing::error!("Listener task failed: {:?}", e);
            }
        }
        result = server_handle => {
            if let Err(e) = result {
                tracing::error!("Server task failed: {:?}", e);
            }
        }
    }
}

async fn sse_handler(
    Extension(id): Extension<Uuid>,
) -> Sse<impl Stream<Item = Result<Event, Error>>> {
    let (tx, mut rx) = mpsc::channel::<entity::notification::Model>(100);
    CONNECTED_CLIENTS.insert(id, tx);

    let stream = stream! {
        while let Some(notification) = rx.recv().await {
            yield Event::default().json_data(notification)
        }
    };

    Sse::new(stream).keep_alive(KeepAlive::new())
}
