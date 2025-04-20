// config/env.ts
import * as dotenv from "dotenv-flow";
import { z } from "zod";
import { ZodEnv } from "zod-env";

// Load environment variables from .env files
dotenv.config({
  node_env: process.env.NODE_ENV,
  silent: true,
  default_node_env: "development",
});

// Define validation schema with documentation
const envSchema = z.object({
  // Server configuration
  NODE_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),
  PORT: z.coerce.number().positive().default(3000),
  Origin: z.string().default("http://localhost:3030"),

  // Database configuration
  DB_HOST: z.string().default("localhost"),
  APP_URL: z.string().default("http://localhost:3030"),
  BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
  MONGO_URI: z.string().default("mongodb://localhost:27017/betterAuth"),
});

// Validate and export the environment configuration
export const config = new ZodEnv(envSchema);
export type Env = z.infer<typeof envSchema>; // Export the schema for documentation generation
