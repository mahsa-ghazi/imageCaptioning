FROM node:12

RUN mkdir /usr/src/app
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install sails -g
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 2222
CMD [ "npm", "start" ]
