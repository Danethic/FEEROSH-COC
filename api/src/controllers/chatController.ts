import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { logInfo, logError } from '../utils/logHelper'; // <- integración

const prisma = new PrismaClient();

// Obtener todos los mensajes (puede filtrarse por temporada o canal)
export const getChats = async (req: Request, res: Response) => {
    try {
        const { seasonId, channel } = req.query;
        const filters: any = {};

        if (seasonId) filters.seasonId = String(seasonId);
        if (channel) filters.channel = String(channel);

        const chats = await prisma.chat.findMany({
            where: filters,
            include: { sender: true, season: true },
            orderBy: { createdAt: 'desc' },
        });

        logInfo('CHAT', `Chats obtenidos correctamente. Total: ${chats.length}`);
        res.json(chats);
    } catch (error) {
        logError('CHAT', 'Error al obtener mensajes');
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
};

// Enviar un mensaje
export const createChat = async (req: Request, res: Response) => {
    try {
        const { seasonId, channel, senderUserId, message, metadata } = req.body;

        if (!channel || !message) {
            logError('CHAT', 'Intento de creación de mensaje con campos faltantes');
            return res.status(400).json({ error: 'Canal y mensaje son requeridos' });
        }

        const chat = await prisma.chat.create({
            data: {
                seasonId,
                channel,
                senderUserId,
                message,
                metadata,
            },
        });

        logInfo('CHAT', `Mensaje creado correctamente por usuario ${senderUserId || 'desconocido'}`);
        res.json(chat);
    } catch (error) {
        logError('CHAT', 'Error al enviar mensaje');
        res.status(500).json({ error: 'Error al enviar mensaje' });
    }
};

// Obtener un mensaje por ID
export const getChatById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const chat = await prisma.chat.findUnique({
            where: { id },
            include: { sender: true, season: true },
        });

        if (!chat) {
            logError('CHAT', `Mensaje no encontrado con ID ${id}`);
            return res.status(404).json({ error: 'Mensaje no encontrado' });
        }

        logInfo('CHAT', `Mensaje obtenido correctamente (ID: ${id})`);
        res.json(chat);
    } catch (error) {
        logError('CHAT', 'Error al obtener mensaje');
        res.status(500).json({ error: 'Error al obtener mensaje' });
    }
};

// Eliminar un mensaje
export const deleteChat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.chat.delete({ where: { id } });

        logInfo('CHAT', `Mensaje eliminado correctamente (ID: ${id})`);
        res.json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
        logError('CHAT', 'Error al eliminar mensaje');
        res.status(500).json({ error: 'Error al eliminar mensaje' });
    }
};
