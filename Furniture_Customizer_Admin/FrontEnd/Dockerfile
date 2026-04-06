# ─── Stage 1: Build stage ─────────────────────────────────────────────
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package files for better caching
COPY package.json package-lock.json ./

# Install dependencies (only production if needed, but we need dev deps to build)
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# ─── Stage 2: Production stage (reduced and secure) ───────────────────
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS production-stage

# Set environment
ENV NODE_ENV=production
ENV PORT=8081

# Working directory
WORKDIR /app

# Copy built files from build-stage (ensure nonroot ownership)
COPY --from=build-stage --chown=nonroot:nonroot /app/dist ./dist

# Copy server.js to serve the static files
COPY --from=build-stage --chown=nonroot:nonroot /app/server.js ./

# Expose port (Internal only, should be mapped by ingress/load balancer)
EXPOSE 8081

# Run the server script (using the built-in entrypoint 'node')
CMD ["server.js"]
