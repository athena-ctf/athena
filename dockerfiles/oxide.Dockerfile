FROM rust:slim-bookworm AS chef
RUN apt-get -y update

RUN cargo install cargo-chef

WORKDIR /app

FROM chef AS planner

COPY ./crates/oxide .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder

COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

COPY ./crates/oxide .
RUN cargo build -r -F file-transport
RUN cp ./target/release/oxide /

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

COPY --from=builder /oxide /usr/local/bin

RUN chown appuser /usr/local/bin/oxide
USER appuser

ENTRYPOINT oxide run /data/config.json