FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm run test

CMD ["npm", "run", "start"]