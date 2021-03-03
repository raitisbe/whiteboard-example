# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:10.16-alpine
RUN apk add --no-cache git
ADD https://gitlab.com/avinet2/map-whiteboard-server/-/archive/swagger-4/map-whiteboard-server-swagger-4.tar.gz /srv/
WORKDIR /srv/
RUN tar xvzf map-whiteboard-server-swagger-4.tar.gz
RUN mv /srv/map-whiteboard-server-swagger-4 /srv/map-whiteboard-server
WORKDIR /srv/map-whiteboard-server
RUN mkdir npm 
RUN npm i
ENTRYPOINT npm run start
