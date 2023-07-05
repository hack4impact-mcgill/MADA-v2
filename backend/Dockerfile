FROM --platform=linux/amd64 node:16-alpine

# ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "./build/src/index.js"]