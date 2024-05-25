# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Set environment variables
ENV PORT=3000

# Run the web service on container startup.
CMD [ "node", "index.js" ]

# Document that the service listens on port 3000.
EXPOSE 3000
