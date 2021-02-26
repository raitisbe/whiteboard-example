# Copyright (c) BOSC
# Distributed under the terms of the Comercial License.

FROM node:10.16-alpine
RUN apk add --no-cache git openssh
RUN mkdir ~/.ssh/
RUN echo -e "Host gitlab.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
COPY secret/id_rsa.pub /root/.ssh/id_rsa.pub
COPY secret/id_rsa /root/.ssh/id_rsa
RUN chmod 700 ~/.ssh
RUN chmod 644 ~/.ssh/config
RUN chmod 644 ~/.ssh/id_rsa.pub
WORKDIR /srv/
RUN git clone git@gitlab.com:Dailis_LAN/whiteboard-admin.git
WORKDIR /srv/whiteboard-admin
RUN npm i
