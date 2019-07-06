FROM ubuntu:15.10
FROM node

RUN apt-get update \ 
  && apt-get install -y git \
  && apt-get install -y zip \
  && mkdir -p /home/Service 

WORKDIR /home/Service

COPY . /home/Service

ARG URL
ARG REPONAME

RUN git clone $URL;

ENV DIRPATH /home/Service
ENV DIRNAME $REPONAME

WORKDIR $DIRPATH/$DIRNAME

RUN npm install --registry=https://registry.npm.taobao.org && npm run build && zip -r build.zip ./dist/ 

CMD [ "zip", "-r", "src.zip", "./src/"]
