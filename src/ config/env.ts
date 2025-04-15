// config/env.ts
import { z } from "zod";
import * as dotenv from "dotenv-flow";
import { ZodEnv } from "zod-env";

// Load environment variables from .env files
dotenv.config({
  node_env: process.env.NODE_ENV,
  silent: true,
  default_node_env: "development"
});

// Define validation schema with documentation
const envSchema = z.object({
  // Server configuration
  NODE_ENV: z
    .enum(["development", "test", "staging", "production"])
    .default("development"),
  PORT: z.coerce.number().positive().default(3000),

  // Database configuration
    DB_HOST: z.string().default("localhost"),
    
});

// Validate and export the environment configuration
export const config = new ZodEnv(envSchema);
export type Env = z.infer<typeof envSchema>; // Export the schema for documentation generation

 