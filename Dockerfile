# Create image based on the official Node 6 image from dockerhub
FROM node:6

ARG GMAIL_PASSWORD=local
ENV GMAIL_PASSWORD ${GMAIL_PASSWORD}
ARG MONGO_USERNAME=local
ENV MONGO_USERNAME ${MONGO_USERNAME}
ARG MONGO_PASSWORD=local
ENV MONGO_PASSWORD ${MONGO_PASSWORD}
ARG MONGO_CONNECTION=local
ENV MONGO_CONNECTION ${MONGO_CONNECTION}
ARG MONGO_DOMAIN=local
ENV MONGO_DOMAIN ${MONGO_DOMAIN}
ARG NODE_PORT=local
ENV NODE_PORT ${NODE_PORT}
ARG APP_ROOT='/usr/src/app/'


# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/uploads
RUN chmod +x /usr/src/app/uploads
RUN mkdir -p /usr/src/app/server
# ADD docker-supervisord.conf /etc/supervisor/conf.d/supervisord.conf 
# Get client and server to the app
# COPY client-build/. /usr/src/app
COPY server/package.json   /usr/src/app/server
# COPY Docker-servers.sh /usr/src/app/
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app/server
# Install dependecies
RUN npm install

COPY server/. /usr/src/app/server

WORKDIR /usr/src/app


EXPOSE 7776
CMD ["node", "server/app.js"]
