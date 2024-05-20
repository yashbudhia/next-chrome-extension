# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run both Next.js and Express
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the built Next.js application from the builder stage
COPY --from=builder /app /app

# Copy the .env file
COPY .env.production .env

# Expose the ports for Next.js and Express
EXPOSE 3000
EXPOSE 8080

# Install concurrently for running both servers
RUN npm install concurrently

# Start both Next.js and Express using concurrently
CMD ["npx", "concurrently", "\"node .next/standalone/server.js\"", "\"node -r dotenv/config backend/index.js\""]
