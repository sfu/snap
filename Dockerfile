FROM node:12-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "start"]

EXPOSE 3000