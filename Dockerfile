FROM node:20 as base

RUN npm i -g @angular/cli

WORKDIR /app

COPY package.json package-lock.json  /app/
RUN npm install

COPY . /app

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]