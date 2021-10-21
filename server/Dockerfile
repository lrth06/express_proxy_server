## NOTE: Currently will NOT run without -e flags OR .env specified in docker-compose.yml
FROM node:alpine3.14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start"]