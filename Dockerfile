FROM node:8
RUN mkdir -p /quo-core
WORKDIR /quo-core
COPY package*.json /quo-core/
RUN npm install
COPY . /quo-core