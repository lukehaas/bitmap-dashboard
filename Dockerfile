# Use official Node.js LTS image
FROM node:23-alpine

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (override in production as needed)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/index.js"]
