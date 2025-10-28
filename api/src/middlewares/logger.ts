// src/middlewares/logger.ts
import { Request, Response, NextFunction } from "express";
import winston from "winston";
import { env } from "../config/env";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

export const loggerInstance = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        loggerInstance.info(
            `${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`
        );
    });
    next();
};
