# THIS DOCKERFILE IS USED TO BUILD THE BACKEND IMAGE

# =========================
# Stage I: Builder
# =========================
FROM node:26-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev


# =========================
# Stage 2: Runner
# =========================
FROM node:26-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
COPY config ./config
COPY controllers ./controllers
COPY middleware ./middleware
COPY database ./database
COPY models ./models
COPY routes ./routes
COPY app.js .
COPY server.js .
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 5000
CMD ["node", "server.js"]