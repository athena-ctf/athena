use config::Settings;

#[tokio::main]
async fn main() {
    let settings = Settings::new(&std::env::args().nth(1).unwrap()).unwrap();
    oxide::start(settings).await.unwrap();
}
