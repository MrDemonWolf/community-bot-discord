FROM node:18-alpine as base

WORKDIR /usr/src/bot

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

# ENV NODE_PATH=./build

RUN npm run build
