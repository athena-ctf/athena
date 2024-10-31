FROM golang:1.22-alpine AS deps

RUN apk add --no-cache git make gcc musl-dev
WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download
RUN go mod verify

FROM deps AS builder

COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /bin/app ./cmd/main.go

FROM alpine:latest AS runner

RUN apk --no-cache add ca-certificates && \
    addgroup -S appuser && \
    adduser -S -G appuser appuser

WORKDIR /app
COPY --from=builder /bin/app /bin/app

USER appuser

EXPOSE 8080
ENTRYPOINT ["/bin/app"]