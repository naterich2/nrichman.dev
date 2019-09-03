FROM node:current-alpine

MAINTAINER Nate Richman <nate@nrichman.dev>


WORKDIR /home/nrichman.dev

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
