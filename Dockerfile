FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8000

# Start HTTP server
CMD ["npm", "run", "dev"]
