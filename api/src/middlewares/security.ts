import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export const setupSecurity = (app: Express) => {
    // Seguridad HTTP headers
    app.use(helmet());

    // Control CORS (ajustar origin según dominio)
    app.use(
        cors({
            origin: '*', // Cambiar en producción (por ej. ['https://tuapp.com'])
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        })
    );

    // Rate limiter básico
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // 100 solicitudes por IP
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests from this IP, please try again later.',
    });

    app.use(limiter);
};
