// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("🧨 Error capturado:", err);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }

    // Errores no controlados
    res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
    });
};
