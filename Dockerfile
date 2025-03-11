FROM node:20 AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM base AS test

RUN CI=true npm test -- --watchAll=false

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=base /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
