FROM node:latest

#set working directory
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH


# install and cache app dependencies

ADD . /usr/src/
ADD package.json /usr/src/package.json
RUN npm install


