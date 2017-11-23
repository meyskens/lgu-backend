FROM multiarch/alpine:arm64-edge

RUN apk add --no-cache ca-certificates nodejs make gcc g++ python linux-headers paxctl gnupg

COPY ./ /opt/lgu-backend
WORKDIR /opt/lgu-backend
RUN mv ./.cache/nm ./node_modules
RUN npm i

ENV MONGOUSER=$MONGOUSER
ENV MONGOPASS=$MONGOPASS
ENV MONGOHOST=$MONGOHOST
ENV MONGOPORT=$MONGOPORT
ENV MONGODB=$MONGODB

ENV port=80

CMD node server.js