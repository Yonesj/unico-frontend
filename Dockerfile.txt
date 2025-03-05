FROM node:20 AS base

FROM base AS test

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm ci 

RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

ENV CHROME_BIN="/usr/bin/google-chrome"

COPY . .

RUN npm test -- --coverage --watch=false

FROM base AS build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
