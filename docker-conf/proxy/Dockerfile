FROM node:10.16-alpine
RUN apk add --no-cache git
COPY ./src/proxy.js /srv/proxy.js
COPY ./package.json /srv/package.json
RUN npm config set unsafe-perm true
WORKDIR /srv/
RUN npm i cors-anywhere


