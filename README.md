# Express Proxy Server

## Reasoning

This repository exists to illustrate how to protect sensitive data when using browser based libraries, such as react, by way of a proxy server. In this case, [Express](https://github.com/expressjs/express) is used as it is very easy to set up and extensible.

This example utilizes the [NASA apod-api](https://github.com/nasa/apod-api) which has an astronomy image/video available for every day between Jun 16, 1995 and today's date.

### To Use Locally:

```bash
git clone https://github.com/lrth06/express_proxy_server.git
cd express_proxy_server
cd server
npm install
```

You **MUST** create a .env file in the /server/ directory for **ANY** of these examples to work!

To do this directly from the terminal:

- input the following, making sure to substitute "Your_API_Key_Here" for your own API key, which can be obtained at [NASA {APIs}](https://api.nasa.gov/)

```bash
touch .env

echo "PORT=5000\nAPI_URL=https://api.nasa.gov/planetary/apod\nAPI_KEY=Your_API_Key_Here" >> .env
```

#### From Command Line

```bash
# This will return the information for the current day.
curl localhost:5000/api/date/$(date '+%Y-%m-%d') | json_pp

```

#### From Client

```bash
## in new terminal
cd ../client
yarn install
yarn start
```

## To Use in Docker

```bash
git clone https://github.com/lrth06/express_proxy_server.git
cd express_proxy_server
## DON'T forget .env!
docker-compose up -d

```
