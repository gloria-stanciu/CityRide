FROM node:12-alpine

WORKDIR /app 

COPY ./ /app

RUN npm install && npm run compile

ENV HOST=0.0.0.0

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "node", "dist" ] 