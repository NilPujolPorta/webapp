FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
COPY . /app
RUN npm start
