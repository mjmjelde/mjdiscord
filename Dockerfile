FROM node:16

WORKDIR /opt/mjdiscord

COPY package*.json ./

RUN apt-get update -y
RUN apt-get install -y ffmpeg wget gnupg ca-certificates \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh


RUN npm install -g typescript@4.3.5
RUN npm install

COPY . .

RUN tsc
CMD [ "node", "dist/main.js" ]