# Use the Node.js image as the base
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
