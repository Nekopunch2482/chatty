FROM node:alpine3.19 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json .

RUN npm ci

FROM base AS builder

WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM nginx:stable-alpine3.17-slim

COPY --from=builder /app/dist /usr/share/nginx/html/
#COPY --from=builder /app/public /usr/share/nginx/html/public
COPY ./nginx.conf /etc/nginx/nginx.conf
