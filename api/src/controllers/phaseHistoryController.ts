import { Request, Response } from 'express';
import { phaseHistoryService } from '../services/phaseHistoryService';
import { logInfo, logError } from '../utils/logHelper';

export const phaseHistoryController = {
    // Obtener todos los registros
    async getAll(req: Request, res: Response) {
        try {
            const list = await phaseHistoryService.getAll();
            logInfo('PHASE_HISTORY', `Historial de fases obtenido correctamente. Total: ${list.length}`);
            res.json(list);
        } catch (error) {
            logError('PHASE_HISTORY', 'Error al obtener historial de fases');
            res.status(500).json({ error: 'Error al obtener historial de fases' });
        }
    },

    // Obtener un registro por ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const record = await phaseHistoryService.getById(id);

            if (!record) {
                logError('PHASE_HISTORY', `Historial de fase no encontrado (ID: ${id})`);
                return res.status(404).json({ error: 'Historial de fase no encontrado' });
            }

            logInfo('PHASE_HISTORY', `Historial de fase obtenido correctamente (ID: ${id})`);
            res.json(record);
        } catch (error) {
            logError('PHASE_HISTORY', 'Error al obtener historial de fase');
            res.status(500).json({ error: 'Error al obtener historial de fase' });
        }
    },

    // Crear un nuevo registro
    async create(req: Request, res: Response) {
        try {
            const { gameStateId, fromPhase, toPhase, changedByUserId, metadata } = req.body;
            const record = await phaseHistoryService.create({
                gameStateId,
                fromPhase,
                toPhase,
                changedByUserId,
                metadata,
            });

            logInfo('PHASE_HISTORY', `Historial de fase creado correctamente (GameState: ${gameStateId})`);
            res.status(201).json(record);
        } catch (error: any) {
            logError('PHASE_HISTORY', 'Error al crear historial de fase');
            res.status(400).json({ error: error.message || 'Error al crear historial de fase' });
        }
    },

    // Eliminar un registro
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await phaseHistoryService.delete(id);

            logInfo('PHASE_HISTORY', `Historial de fase eliminado correctamente (ID: ${id})`);
            res.status(204).end();
        } catch (error: any) {
            logError('PHASE_HISTORY', `Error al eliminar historial de fase (ID: ${req.params.id})`);
            res.status(400).json({ error: error.message || 'Error al eliminar historial de fase' });
        }
    },
};
