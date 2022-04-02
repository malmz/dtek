FROM node:17-alpine AS builder
WORKDIR /usr/src/app

# Add package.json
COPY ["package.json", "package-lock.json", "./"]
COPY ./packages/backend/package.json ./packages/backend/
COPY ./packages/linsen-pdf-extractor/package.json ./packages/linsen-pdf-extractor/

# Install dependencies
RUN npm ci

# Add source
COPY ./tsconfig.json ./
COPY ./packages/backend/ ./packages/backend/
COPY ./packages/linsen-pdf-extractor/ ./packages/linsen-pdf-extractor/

RUN npm run build -w backend
RUN npm prune --production

#FROM gcr.io/distroless/node:16
FROM node:17-alpine
ENV NODE_ENV=production
ENV HOST="0.0.0.0"
ENV PORT=80

WORKDIR /usr/src
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/packages/linsen-pdf-extractor ./packages/linsen-pdf-extractor
COPY --from=builder /usr/src/app/packages/backend/migrations ./migrations
COPY --from=builder /usr/src/app/packages/backend/dist ./app

WORKDIR /usr/src/app

EXPOSE 80
RUN chown -R node /usr/src/app
USER node

CMD [ "node", "main.js" ]
