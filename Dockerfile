FROM node:12

WORKDIR /opt/mjdiscord

COPY package*.json ./

RUN npm install -g typescript
RUN npm install

COPY . .

RUN tsc
CMD [ "node", "dist/main.js" ]