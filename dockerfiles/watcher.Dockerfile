FROM rust:slim-bookworm AS builder
RUN apt-get -y update

COPY . .
RUN cargo build --bin watcher --release
RUN cp ./target/release/api /

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

COPY --from=builder /api /usr/local/bin

RUN chown appuser /usr/local/bin/api
USER appuser

ENTRYPOINT api run /data/config.json