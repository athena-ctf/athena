FROM node:alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

FROM alpine as base
RUN corepack enable

FROM base AS pruner
ARG PROJECT

WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune --scope=${PROJECT} --docker

FROM base AS builder
ARG PROJECT

WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

COPY --from=parent ./data/config.json /data/config.json
RUN pnpm dlx turbo build --filter=${PROJECT}
RUN pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

FROM alpine AS runner
ARG PROJECT
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/${PROJECT}/next.config.mjs .
COPY --from=builder /app/apps/${PROJECT}/package.json .

COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["node", "apps/${PROJECT}/server.js"]