FROM node:20.11
WORKDIR /app
COPY . .

ENV PORT=4000
ENV NODE_ENV=development

RUN npm install

EXPOSE $PORT

CMD ["npm", "start"]
