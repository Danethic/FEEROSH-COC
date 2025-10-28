import { z } from "zod";

// Esquema para registro
export const registerSchema = z.object({
    walletAddress: z
        .string()
        .min(42, "Dirección inválida, debe tener al menos 42 caracteres")
        .regex(/^0x[a-fA-F0-9]{40}$/, "Dirección de wallet no válida"),
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Esquema para login
export const loginSchema = z.object({
    walletAddress: z
        .string()
        .min(42, "Dirección inválida")
        .regex(/^0x[a-fA-F0-9]{40}$/, "Dirección de wallet no válida"),
    password: z.string().min(6, "Contraseña muy corta"),
});
