import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { logInfo, logError } from '../utils/logHelper';

const prisma = new PrismaClient();

// Obtener todas las acciones (opcionalmente filtradas)
export const getUserPhaseActions = async (req: Request, res: Response) => {
    try {
        const { userId, seasonId, phase, actionType } = req.query;
        const filters: any = {};

        if (userId) filters.userId = String(userId);
        if (seasonId) filters.seasonId = String(seasonId);
        if (phase) filters.phase = Number(phase);
        if (actionType) filters.actionType = String(actionType);

        const actions = await prisma.userPhaseAction.findMany({
            where: filters,
            include: { user: true, season: true },
            orderBy: { createdAt: 'desc' },
        });

        logInfo('USER_PHASE_ACTION', `Acciones de fase obtenidas correctamente (${actions.length})`);
        res.json(actions);
    } catch (error) {
        logError('USER_PHASE_ACTION', 'Error al obtener acciones de fase');
        res.status(500).json({ error: 'Error al obtener acciones de fase' });
    }
};

// Crear una nueva acción
export const createUserPhaseAction = async (req: Request, res: Response) => {
    try {
        const { userId, seasonId, phase, actionType } = req.body;

        if (!userId || phase === undefined || !actionType) {
            logError('USER_PHASE_ACTION', 'Faltan campos requeridos al crear acción');
            return res.status(400).json({ error: 'userId, phase y actionType son requeridos' });
        }

        const action = await prisma.userPhaseAction.create({
            data: { userId, seasonId, phase, actionType },
        });

        logInfo('USER_PHASE_ACTION', `Acción creada correctamente (UserID: ${userId}, Phase: ${phase}, Type: ${actionType})`);
        res.json(action);
    } catch (error: any) {
        if (error.code === 'P2002') {
            logError('USER_PHASE_ACTION', 'Acción duplicada detectada');
            return res.status(409).json({ error: 'Acción duplicada para el mismo usuario/fase/tipo' });
        }

        logError('USER_PHASE_ACTION', 'Error al crear acción de fase');
        res.status(500).json({ error: 'Error al crear acción de fase' });
    }
};

// Marcar una acción como usada
export const markActionUsed = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updated = await prisma.userPhaseAction.update({
            where: { id },
            data: { used: true, usedAt: new Date() },
        });

        logInfo('USER_PHASE_ACTION', `Acción marcada como usada (ID: ${id})`);
        res.json(updated);
    } catch (error) {
        logError('USER_PHASE_ACTION', `Error al marcar acción como usada (ID: ${req.params.id})`);
        res.status(500).json({ error: 'Error al actualizar acción' });
    }
};

// Eliminar una acción
export const deleteUserPhaseAction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.userPhaseAction.delete({ where: { id } });

        logInfo('USER_PHASE_ACTION', `Acción eliminada correctamente (ID: ${id})`);
        res.json({ message: 'Acción eliminada correctamente' });
    } catch (error) {
        logError('USER_PHASE_ACTION', `Error al eliminar acción (ID: ${req.params.id})`);
        res.status(500).json({ error: 'Error al eliminar acción de fase' });
    }
};
