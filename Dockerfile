# Usage example
# 1) Build: $ docker build -o build .

FROM node:10.15.1 as build

WORKDIR /usr/src/app

COPY . .

ARG APP_ENV=production

RUN apt-get update -qq \
  && apt-get install -y build-essential ruby-full \
  && gem install compass \
  && npm install -g grunt-cli \
  && npm install \
  && APP_ENV=${APP_ENV} grunt

FROM scratch AS export-stage

COPY --from=build /usr/src/app/build /
