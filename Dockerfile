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

ENV TWILIO_PUBLIC=ACb53d79cd749963468aee52bd85dbe5f2
ENV TWILIO_PRIVATE=$TWILIO
ENV PHONENUMBER=32460201216

ENV PORT=80
ENV NOCORS=true

CMD node server.js