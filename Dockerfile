FROM node:22.14.0

WORKDIR /libms/src/app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]