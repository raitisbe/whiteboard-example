# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:10.16-alpine
RUN apk add --no-cache git
COPY ./dist /srv/
RUN npm config set unsafe-perm true
RUN npm i http-server -g
WORKDIR /srv/

