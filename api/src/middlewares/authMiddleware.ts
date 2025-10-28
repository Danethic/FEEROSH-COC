// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Falta la variable JWT_SECRET en el entorno (.env)");
}

interface JwtPayload {
    userId: string;
    walletAddress: string;
    iat?: number;
    exp?: number;
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Token no proporcionado" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("Error en autenticación JWT:", error);
        res.status(401).json({ error: "Token inválido o expirado" });
    }
};
