FROM caddy:builder-alpine as builder

RUN RUN xcaddy build \
    --with github.com/mholt/caddy-l4 \
    --with github.com/mholt/caddy-ratelimit \
    --with github.com/caddyserver/cache-handler

FROM caddy:alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy