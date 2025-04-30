# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Install all dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Prepare production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
