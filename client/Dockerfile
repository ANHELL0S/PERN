FROM node:latest 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

COPY .env .env

EXPOSE 5173

CMD ["npm", "run", "dev"]

