FROM node:12-alpine

WORKDIR /app 

COPY ./ /app

RUN npm install

RUN npm run build

ENV HOST=0.0.0.0

EXPOSE 3000

CMD [ "node", "dist" ]