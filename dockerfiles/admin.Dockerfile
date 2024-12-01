FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpx turbo prune --scope=admin --docker
RUN pnpm install
RUN pnpx turbo run build --filter=admin

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/apps/admin/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]