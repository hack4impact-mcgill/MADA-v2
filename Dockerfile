FROM --platform=linux/amd64 node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ./backend .

# This container should continue running after seeding, as AWS ECS Fargate resource creation will terminate if any of the container exits.
CMD ["sh", "-c", "npm run seed && tail -f /dev/null"]
