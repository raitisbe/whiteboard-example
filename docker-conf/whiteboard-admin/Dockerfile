# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:14.16-alpine
#RUN apk add --no-cache git openssh
#RUN mkdir ~/.ssh/
#RUN echo -e "Host gitlab.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
#COPY secret/id_rsa.pub /root/.ssh/id_rsa.pub
#COPY secret/id_rsa /root/.ssh/id_rsa
#RUN chmod 700 ~/.ssh
#RUN chmod 644 ~/.ssh/config
#RUN chmod 644 ~/.ssh/id_rsa.pub
WORKDIR /srv/

#COPY static/map-whiteboard-lib-raitis-branch-2.tar.gz /srv/map-whiteboard-lib-raitis-branch-2.tar.gz
#RUN tar xvzf map-whiteboard-lib-raitis-branch-2.tar.gz
#RUN mv /srv/map-whiteboard-lib-raitis-branch-2 /srv/map-whiteboard-lib

#COPY static/hslayers-ng-to-angular11.zip /srv/hslayers-ng-to-angular11.zip
#RUN unzip hslayers-ng-to-angular11.zip
#RUN mv /srv/hslayers-ng-to-angular11/projects/hslayers /srv/hslayers-ng

#RUN git clone git@gitlab.com:Dailis_LAN/whiteboard-admin.git
RUN mkdir /srv/whiteboard-admin
WORKDIR /srv/whiteboard-admin

#RUN npm i
RUN npm i http-server -g

#RUN node_modules/.bin/ng build --prod --base-href ./admin/
COPY dist/whiteboard-admin /srv/whiteboard-admin/dist/whiteboard-admin