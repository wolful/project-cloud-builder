FROM alpine:3.7
FROM node:8.10.0-alpine

RUN  apk add --no-cache git \
  && apk add  --no-cache zip \
  && mkdir -p /home/Service

WORKDIR /home/Service

COPY . /home/Service

RUN npm config set registry https://registry.npm.taobao.org \
  && npm install \
  && npm run build 

EXPOSE 8090

CMD ["npm", "start"]
