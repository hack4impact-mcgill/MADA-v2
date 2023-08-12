FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ./backend .

# This container will terminate after seeding.
ENTRYPOINT ["npm", "run", "seed"] 
