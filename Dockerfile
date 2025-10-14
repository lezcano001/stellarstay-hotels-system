# -------------------------------
# 1. Build stage
# -------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# -------------------------------
# 2. Production stage
# -------------------------------
FROM node:22-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose app port
EXPOSE 3000

# Use a non-root user for security
USER node

# Start the app
CMD ["node", "dist/main.js"]