FROM rust:slim-bookworm AS builder
RUN apt-get -y update

COPY . .
RUN cargo build --bin notifier --release
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