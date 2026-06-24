# Use official Node.js image
FROM node:20-alpine

# Create app directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 3000 (Node.js server)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
