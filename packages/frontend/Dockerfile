FROM node:17-alpine as builder
WORKDIR /usr/src/app

# Add root package.json
COPY ["package.json", "package-lock.json", "./"]
COPY ./packages/frontend/package.json ./packages/frontend/

# Install dependencies
RUN npm ci

# Add source
COPY ./tsconfig.json ./
COPY ./packages/frontend/ ./packages/frontend/

ENV VITE_API_URL=http://localhost:8080
RUN npm run build -w frontend

FROM nginx:alpine
EXPOSE 80

COPY ./packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/packages/frontend/dist /usr/share/nginx/html

