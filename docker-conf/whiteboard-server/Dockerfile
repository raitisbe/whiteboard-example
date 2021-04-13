# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:14.16-alpine
RUN apk add --no-cache git
RUN mkdir /srv/map-whiteboard-server
WORKDIR /srv/map-whiteboard-server
COPY whiteboard-server-dist/dist /srv/map-whiteboard-server
RUN mkdir npm 
RUN npm i
ENTRYPOINT node app.js
#ENTRYPOINT ["tail"]
#CMD ["-f","/dev/null"]
