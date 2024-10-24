FROM rust:slim-bookworm AS chef
RUN apt-get -y update
RUN apt-get -y install curl unzip ca-certificates
RUN update-ca-certificates

RUN cargo install cargo-chef

WORKDIR /app

RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v27.1/protoc-27.1-linux-x86_64.zip
RUN unzip protoc-27.1-linux-x86_64.zip -d .
ENV PROTOC=/app/bin/protoc

FROM chef as planner

COPY . .
RUN mkdir -p /data/proto
COPY --from=parent ./data/proto/instance.proto /data/proto/instance.proto
RUN cargo chef prepare  --recipe-path recipe.json

FROM chef as builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

COPY . .
RUN mkdir -p /data/proto
COPY --from=parent ./data/proto/instance.proto /data/proto/instance.proto

RUN cargo build -r -F file-transport
RUN cp ./target/release/oxide /

FROM debian:bookworm-slim AS final

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    appuser

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /oxide /usr/local/bin

RUN chown appuser /usr/local/bin/oxide
USER appuser

WORKDIR /oxide
ENTRYPOINT oxide run /data/config.toml