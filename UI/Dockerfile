# Node.js v22
FROM node:22

# Working dir
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Installing deps
RUN npm install

# Copy source code into container
COPY . .

# Open port 5173 for Vite
EXPOSE 5173

# Run UI
CMD ["npm", "run", "dev"]