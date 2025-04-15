import { createClient } from "redis";
export const cache = createClient({ url: process.env.REDIS_URL });

// Initialize connection
export async function initCache() {
  await cache.connect();
}
