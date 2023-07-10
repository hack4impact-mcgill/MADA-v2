# stage 1 - build react app. Name it "build" stage to reference in stage 2.
FROM --platform=linux/amd64 node:16-alpine as build 

# ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "build"]

# stage 2 - build the final image and copy the react build files to serve using nginx
FROM nginx:1.17.8-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# nginx needs to stay running in foreground for docker container to run without stopping immediately.
# for reference: https://hub.docker.com/_/nginx
CMD ["nginx", "-g", "daemon off;"]