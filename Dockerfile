FROM node:8

RUN mkdir /var/app
WORKDIR /var/app

COPY package.json /var/app/package.json
COPY package-lock.json /var/app/package-lock.json
RUN npm install

VOLUME /var/app