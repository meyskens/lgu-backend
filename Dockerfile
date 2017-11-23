FROM multiarch/alpine:arm64-edge

ENV VERSION=v8.9.1 YARN_VERSION=latest

RUN apk add --no-cache ca-certificates nodejs

COPY ./ /opt/lgu-backend
WORKDIR /opt/lgu-backend
RUN npm i

CMD node server.js