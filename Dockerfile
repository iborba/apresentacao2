FROM node:8-alpine as builder
ADD ./ /src
WORKDIR /src
RUN chmod 600 /src/mpn-libs-ssh-key
ENV GIT_SSH="/src/ssh-mpn-libs.sh"
RUN npm install
RUN apk add --no-cache curl
RUN npm run compile
CMD ["npm", "run", "start"]