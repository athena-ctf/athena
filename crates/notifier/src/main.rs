use std::collections::HashMap;
use std::sync::LazyLock;

use async_stream::stream;
use axum::response::sse::{Event, KeepAlive};
use axum::response::Sse;
use axum::routing::get;
use axum::{Error, Extension, Router};
use futures::Stream;
use listener::start_listening;
use tokio::net::TcpListener;
use tokio::sync::mpsc::{self, Sender};
use tokio::sync::RwLock;
use tower_http::trace::TraceLayer;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;
use uuid::Uuid;

mod listener;

pub const CHANNEL_NAME: &str = "users_notify_change";

static CONNECTED_CLIENTS: LazyLock<RwLock<HashMap<Uuid, Sender<entity::notification::Model>>>> =
    LazyLock::new(|| RwLock::new(HashMap::new()));

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                format!("{}=debug,tower_http=debug", env!("CARGO_CRATE_NAME")).into()
            }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let pool = sqlx::PgPool::connect("").await.unwrap();

    start_listening(&pool, call_back).await.unwrap();

    let listener = TcpListener::bind("127.0.0.1:3000").await.unwrap();
    let app = Router::new()
        .route("/", get(sse_handler))
        .layer(TraceLayer::new_for_http());

    tracing::debug!("listening on {}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}

async fn call_back(model: entity::notification::Model) {
    if let Some(tx) = CONNECTED_CLIENTS.read().await.get(&model.id) {
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
