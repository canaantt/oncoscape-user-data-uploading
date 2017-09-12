# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server

# Get client and server to the app
COPY client-build/. /usr/src/app
COPY server/package.json   /usr/src/app/server

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app/server
# Install dependecies
RUN npm install

COPY server/. /usr/src/app/server

WORKDIR /usr/src/app

# Expose the port the app runs in
EXPOSE 8080 3000

# Serve the app
# GMAIL_PASSWORD=oncoscapepassword MONGO_USERNAME=oncoscape MONGO_PASSWORD=gQx4T4bbCmM04Cu node server/server-docker.js & http-server 
# CMD [".", "Docker-servers.sh"]

CMD ["node", "server/server-docker.js", "&", "http-server"]
