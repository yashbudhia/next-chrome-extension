# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /out

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
WORKDIR /out

# Copy the built Next.js application from the builder stage
COPY --from=builder /out /out

# Install dotenv package to load environment variables
RUN npm install dotenv

# Copy the .env file
COPY .env .env

# Expose the ports for Next.js and Express
EXPOSE 3000
EXPOSE 8080

# Start both Next.js and Express
CMD ["sh", "-c", "npm run start & node -r dotenv/config backend/index.js"]