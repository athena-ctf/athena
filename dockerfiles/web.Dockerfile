FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpx turbo prune --scope=web --docker
RUN pnpm install
RUN pnpx turbo run build --filter=web

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/apps/web/dist .

COPY data/web-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]