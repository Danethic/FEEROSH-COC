// src/config/env.ts

import dotenv from 'dotenv';
import { z } from 'zod';

// Carga el archivo .env (debe existir en raíz)
dotenv.config();

// Definimos el esquema de validación
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.string().url({ message: 'DATABASE_URL must be a valid URL' }),
    JWT_SECRET: z
        .string()
        .min(32, 'JWT_SECRET must be at least 32 characters long for security'),
    JWT_EXPIRES_IN: z.string().default('1h'),
    SENTRY_DSN: z.string().optional(),
});

// Validamos las variables cargadas
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('\n❌ Invalid environment configuration:\n');
    console.error(parsed.error.format());
    throw new Error('Environment validation failed. Please check your .env file.');
}

// Exportamos variables ya validadas y tipadas
export const env = parsed.data;
export type Env = typeof env;
