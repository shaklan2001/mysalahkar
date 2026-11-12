# syntax=docker/dockerfile:1.7
# Website image for ECS. Pin the node base image by digest before the first prod deploy.
#
#   docker build --platform linux/amd64 -t mysalahkar-web .
#   docker run -p 3000:3000 --env-file .env mysalahkar-web
#
# No secrets are baked in: AUTH0_* and APP_BASE_URL are read at runtime (ECS task secrets from
# mysalahkar/${ENV}/web). Leave API_ORIGIN unset on AWS; the ALB routes /api/v1/* to the API.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS web
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.status<500?0:1),()=>process.exit(1))"
CMD ["node", "server.js"]
