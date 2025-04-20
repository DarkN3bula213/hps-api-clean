import { cache } from "./cache";

export async function verifyApiKey(apiKey: string): Promise<boolean> {
  // Check cache first
  const cachedKey = await cache.get(`api-key:${apiKey}`);
  if (cachedKey) return true;

  // Fall back to database
  // const validKey = await db.apiKeys.findUnique({ where: { key: apiKey } });
  // Simulate database check
  const validKey = "true"; // Replace with actual database check
  // Simulate a delay for the database check
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Check if the key is valid
  // if (validKey) {
  //   // Cache the valid key
  //   await cache.set(`api-key:${apiKey}`, "valid", { EX: 3600 });
  //   return true;
  // }
  // Simulate a delay for the database check

  if (validKey) {
    // Cache the valid key
    await cache.set(`api-key:${apiKey}`, "valid", { EX: 3600 });
    return true;
  }

  return false;
}
