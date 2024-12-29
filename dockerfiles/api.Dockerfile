FROM rust:slim-bullseye AS builder

COPY . .
RUN cargo build --bin api --release --features file-transport
RUN cp ./target/release/api /

FROM debian:bullseye-slim AS final

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

ENTRYPOINT ["api", "run", "/data/config.json"]