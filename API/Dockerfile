# Node.js version 22
FROM node:22

# Working dir
WORKDIR /app

# copy package.json and package-lock.js
COPY package*.json ./

# Installing deps
RUN npm install

# Copy source code to container
COPY . .

# Open port 3000
EXPOSE 3000

# Installing nodemon
RUN npm install -g nodemon

# Start the server
CMD ["nodemon", "--legacy-watch", "./src/server.js"]