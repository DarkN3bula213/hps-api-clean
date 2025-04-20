# Stage 1: Builder
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies including devDependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
RUN pnpm build

# Prune dev dependencies
RUN pnpm prune --prod

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Set NODE_ENV environment variable
ENV NODE_ENV production
# Default port (can be overridden by docker-compose)
ENV PORT 3000

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE ${PORT}

# Define the command to run the application
# The entrypoint script from package.json is dist/src/index.js
CMD ["node", "dist/index.js"]
