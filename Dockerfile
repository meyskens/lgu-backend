FROM multiarch/alpine:arm64-edge

RUN apk add --no-cache ca-certificates nodejs make gcc g++ python linux-headers paxctl gnupg

COPY ./ /opt/lgu-backend
WORKDIR /opt/lgu-backend
RUN npm i

ENV MONGODB=$MONGOURL

CMD node server.js