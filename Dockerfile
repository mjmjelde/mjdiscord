FROM node:12

WORKDIR /opt/mjdiscord

COPY package*.json ./

RUN apt-get update -y
RUN apt-get install -y ffmpeg

RUN npm install -g typescript@3.9.7
RUN npm install

COPY . .

RUN tsc
CMD [ "node", "dist/main.js" ]