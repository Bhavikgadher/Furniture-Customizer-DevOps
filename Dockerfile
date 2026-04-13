# syntax=docker/dockerfile:1

# ─── COMMON BUILD BASE ──────────────────────────────────────────────────────
# Using Node 22 Alpine for the build stage to keep the build environment light
FROM node:22-alpine AS base
WORKDIR /app

# ─── BACKEND BUILDER ────────────────────────────────────────────────────────
# This stage installs production dependencies for the Node.js API
FROM base AS backend-builder
# Copy only package files first to leverage BuildKit cache mount
COPY Furniture-Backend/package.json Furniture-Backend/package-lock.json ./
# BuildKit Cache Mount Persists the npm cache between builds
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev
# Copy source
COPY Furniture-Backend/src ./src
COPY Furniture-Backend/package.json ./

# ─── END-USER UI BUILDER ────────────────────────────────────────────────────
# This stage builds the frontend for customers
FROM base AS enduser-builder
COPY Furniture_Customizer_EndUser/package.json Furniture_Customizer_EndUser/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY Furniture_Customizer_EndUser/ .
RUN npm run build

# ─── ADMIN UI BUILDER ───────────────────────────────────────────────────────
# This stage builds the frontend for administrators
FROM base AS admin-builder
COPY Furniture_Customizer_Admin/FrontEnd/package.json Furniture_Customizer_Admin/FrontEnd/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY Furniture_Customizer_Admin/FrontEnd/ .
RUN npm run build

# ─── BACKEND PRODUCTION (Distroless) ────────────────────────────────────────
# Final production image: minimal, secure, and small
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS backend
WORKDIR /app
COPY --from=backend-builder --chown=nonroot:nonroot /app/node_modules ./node_modules
COPY --from=backend-builder --chown=nonroot:nonroot /app/src ./src
COPY --from=backend-builder --chown=nonroot:nonroot /app/package.json ./
EXPOSE 3000
# Distroless has no shell, CMD is passed directly to the node entrypoint
CMD ["src/server.js"]

# ─── END-USER UI PRODUCTION (Distroless) ───────────────────────────────────
# Final production image for the customer interface
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS user-ui
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=enduser-builder --chown=nonroot:nonroot /app/dist ./dist
COPY --from=enduser-builder --chown=nonroot:nonroot /app/server.js ./
EXPOSE 8080
CMD ["server.js"]

# ─── ADMIN UI PRODUCTION (Distroless) ──────────────────────────────────────
# Final production image for the admin portal
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS admin-ui
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8081
COPY --from=admin-builder --chown=nonroot:nonroot /app/dist ./dist
COPY --from=admin-builder --chown=nonroot:nonroot /app/server.js ./
EXPOSE 8081
CMD ["server.js"]
