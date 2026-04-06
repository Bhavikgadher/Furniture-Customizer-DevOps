# ─── Stage 1: Install production dependencies ────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

# Install only production deps, clean npm cache
RUN npm ci --omit=dev && npm cache clean --force

# ─── Stage 2: Distroless runtime ─────────────────────────────────────────────
# gcr.io/distroless/nodejs22-debian12:nonroot has no shell, no package manager,
# no extra tooling — minimal attack surface.
FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

# Copy production node_modules from deps stage (ensure nonroot ownership)
COPY --from=deps --chown=nonroot:nonroot /app/node_modules ./node_modules

# Copy application source
COPY --chown=nonroot:nonroot src ./src

# Copy package.json (needed by some libs for version/name resolution)
COPY --chown=nonroot:nonroot package.json ./

# nonroot user (uid 65532) is set as default by the :nonroot image tag

EXPOSE 3000

# Distroless has no shell, CMD is passed to the entrypoint 'node'
CMD ["src/server.js"]
