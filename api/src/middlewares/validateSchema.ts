import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateSchema =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction): void => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    res.status(400).json({
                        error: "Datos inválidos",
                        details: error.issues.map((e) => ({
                            campo: e.path.join("."),
                            mensaje: e.message,
                        })),
                    });
                } else {
                    res.status(500).json({ error: "Error de validación inesperado" });
                }
            }
        };
