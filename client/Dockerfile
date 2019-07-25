# FROM node:lts-alpine

# RUN mkdir -p /srv/app/client
# WORKDIR /srv/app/client
# COPY package.json /srv/app/client
# COPY package-lock.json /srv/app/client

# RUN npm install
# RUN npm install @vue/cli@3.7.0 -g
# RUN apk update && apk add bash

# COPY . /srv/app/client

# EXPOSE 8080

# CMD ["npm", "run", "dev"]

# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install @vue/cli@3.7.0 -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
