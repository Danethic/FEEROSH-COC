// src/controllers/activityEventController.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { logInfo, logError, logWarn } from "../utils/logHelper";

const prisma = new PrismaClient();

// Obtener todos los eventos
export const getEvents = async (req: Request, res: Response) => {
    try {
        logInfo("EVENT", "Solicitud para obtener todos los eventos");

        const events = await prisma.activityEvent.findMany({
            include: { user: true, season: true },
            orderBy: { occurredAt: "desc" },
        });

        logInfo("EVENT", `Eventos obtenidos: ${events.length}`);
        res.json(events);
    } catch (error) {
        logError("EVENT", error);
        res.status(500).json({ error: "Error al obtener eventos" });
    }
};

// Crear un nuevo evento
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { userId, seasonId, eventType, payload } = req.body;

        logInfo("EVENT", `Creando evento tipo "${eventType}" para usuario ${userId}`);

        const event = await prisma.activityEvent.create({
            data: {
                userId,
                seasonId,
                eventType,
                payload,
                ip: req.ip,
                userAgent: req.headers["user-agent"],
            },
        });

        logInfo("EVENT", `Evento creado correctamente: ID ${event.id}`);
        res.status(201).json(event);
    } catch (error) {
        logError("EVENT", error);
        res.status(500).json({ error: "Error al crear evento" });
    }
};

// Obtener evento por ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        logInfo("EVENT", `Buscando evento con ID: ${id}`);

        const event = await prisma.activityEvent.findUnique({
            where: { id },
            include: { user: true, season: true },
        });

        if (!event) {
            logWarn("EVENT", `Evento no encontrado: ${id}`);
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        logInfo("EVENT", `Evento encontrado: ${event.id}`);
        res.json(event);
    } catch (error) {
        logError("EVENT", error);
        res.status(500).json({ error: "Error al obtener evento" });
    }
};

// Eliminar evento
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        logInfo("EVENT", `Eliminando evento con ID: ${id}`);

        await prisma.activityEvent.delete({ where: { id } });

        logInfo("EVENT", `Evento ${id} eliminado correctamente`);
        res.json({ message: "Evento eliminado correctamente" });
    } catch (error) {
        logError("EVENT", error);
        res.status(500).json({ error: "Error al eliminar evento" });
    }
};
