// src/config/env.ts
import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

// Cargar .env.<NODE_ENV> si existe, sino fallback a .env
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), envFile), override: true });
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.string().url().optional(),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long for security"),
    JWT_EXPIRES_IN: z.string().default("1h"),
    SENTRY_DSN: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

console.log("JWT_SECRET length:", process.env.JWT_SECRET?.length, "value:", process.env.JWT_SECRET);


if (!_env.success) {
    console.error("\n❌ Invalid environment configuration:\n");
    console.error(_env.error.format());
    throw new Error("Environment validation failed. Please check your .env file.");
}

export const env = _env.data;
export type Env = typeof env;
