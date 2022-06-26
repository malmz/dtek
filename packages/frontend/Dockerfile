FROM node:17-alpine as builder
WORKDIR /usr/src/app

RUN corepack enable
RUN corepack prepare pnpm@7.0.0 --activate

# Add root package.json
COPY ./package.json ./
COPY ./packages/frontend/package.json ./packages/frontend/
COPY ./pnpm-lock.yaml ./
COPY ./pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm -F frontend install --frozen-lockfile

# Add source
COPY ./tsconfig.json ./
COPY ./packages/frontend/ ./packages/frontend/

ENV VITE_API_URL=/api
ENV VITE_AUTH_URL=/auth

RUN pnpm -F frontend run build

FROM nginx:alpine
WORKDIR /usr/src/app
EXPOSE 80

COPY ./packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/packages/frontend/dist ./

