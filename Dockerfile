FROM node:18-alpine AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

RUN apk --no-cache add python3 make g++
RUN npm install

COPY frontend/ .

RUN npm run build

FROM nginx:1.23.1-alpine

EXPOSE 80 443

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html