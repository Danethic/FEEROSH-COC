import { ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: (error as any).errors,
                });
            }
        };
