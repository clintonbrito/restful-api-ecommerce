# Dockerfile
FROM node:20.12.2-alpine3.18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3333

# Start the app
CMD ["node", "ace", "serve", "--hmr"]
