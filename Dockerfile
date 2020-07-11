FROM node:12

WORKDIR /opt/mjdiscord

COPY packages*.json ./

RUN npm install -g typescript
RUN npm install

COPY src src

RUN tsc
CMD [ "node", "dist/main.js" ]