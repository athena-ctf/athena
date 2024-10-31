FROM rust:slim-bookworm AS chef
RUN apt-get -y update

RUN cargo install cargo-chef

WORKDIR /app

FROM chef AS planner

COPY ./crates/notifier .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder

COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

COPY ./crates/notifier .
RUN cargo build -r
RUN cp ./target/release/notifier /

FROM debian:bookworm-slim AS final

WORKDIR /app
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    appuser

COPY --from=builder /notifier /usr/local/bin

RUN chown appuser /usr/local/bin/notifier
USER appuser

ENTRYPOINT notifier /data/config.json