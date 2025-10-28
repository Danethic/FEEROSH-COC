import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../prisma/client";
import { generateToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../schemas/authSchema";
import { logInfo, logError, logWarn } from "../utils/logHelper";

// Registro
export const register = async (req: Request, res: Response) => {
    try {
        const data = registerSchema.parse(req.body);
        const { walletAddress, username, password } = data;

        logInfo("AUTH", `Intento de registro para wallet: ${walletAddress}`);

        const existingUser = await prisma.user.findUnique({ where: { walletAddress } });
        if (existingUser) {
            logWarn("AUTH", `Intento de registro duplicado para wallet: ${walletAddress}`);
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { walletAddress, username, passwordHash },
        });

        const token = generateToken({ userId: newUser.id, walletAddress: newUser.walletAddress });

        logInfo("AUTH", `Usuario registrado exitosamente: ${walletAddress}`);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        logError("AUTH", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const data = loginSchema.parse(req.body);
        const { walletAddress, password } = data;

        logInfo("AUTH", `Intento de login para wallet: ${walletAddress}`);

        const user = await prisma.user.findUnique({ where: { walletAddress } });
        if (!user || !user.passwordHash) {
            logWarn("AUTH", `Credenciales inválidas (usuario no encontrado): ${walletAddress}`);
            return res.status(400).json({ error: "Credenciales inválidas" });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            logWarn("AUTH", `Contraseña incorrecta para wallet: ${walletAddress}`);
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        const token = generateToken({ userId: user.id, walletAddress: user.walletAddress });
        logInfo("AUTH", `Login exitoso para wallet: ${walletAddress}`);

        res.json({ token, user });
    } catch (error) {
        logError("AUTH", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Verificar token
export const verify = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        logInfo("AUTH", `Token verificado correctamente para usuario ID: ${user?.userId}`);
        res.json({ valid: true, user });
    } catch (error) {
        logError("AUTH", error);
        res.status(401).json({ valid: false });
    }
};
