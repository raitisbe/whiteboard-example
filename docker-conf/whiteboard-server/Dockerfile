# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:10.16-alpine
RUN apk add --no-cache git
ADD https://gitlab.com/avinet2/map-whiteboard-server/-/archive/raitis-branch-6/map-whiteboard-server-raitis-branch-6.tar.gz /srv/
WORKDIR /srv/
RUN tar xvzf map-whiteboard-server-raitis-branch-6.tar.gz
RUN mv /srv/map-whiteboard-server-raitis-branch-6 /srv/map-whiteboard-server
WORKDIR /srv/map-whiteboard-server
RUN mkdir npm 
RUN npm i
ENTRYPOINT npm run start
