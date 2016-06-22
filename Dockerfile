FROM node:latest

# MongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/debian wheezy/mongodb-org/3.2 main" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update && apt-get install -y mongodb-org
RUN mkdir -p /data/db

# Workspace preparation
RUN mkdir app/
RUN git clone https://github.com/appmazing/expressify-express-starterkit.git app/
WORKDIR "app/expressify-express-starterkit/"
RUN npm install

# Environment variables
ENV DOCKERIZED=true
ENV PORT=3000

# Default port exposing
EXPOSE 3000

# Start MongoDB and App
CMD service mongod start && npm start
