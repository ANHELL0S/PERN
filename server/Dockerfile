FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env .env

EXPOSE 3000

CMD ["npm", "run", "start"]
