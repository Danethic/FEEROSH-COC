import { Request, Response } from 'express';
import { gameStateService } from '../services/gameStateService';
import { logInfo, logError } from '../utils/logHelper'; // <- integración

export const gameStateController = {
    // Obtener todos los estados
    async getAll(req: Request, res: Response) {
        try {
            const states = await gameStateService.getAll();
            logInfo('GAME_STATE', `Estados de juego obtenidos correctamente. Total: ${states.length}`);
            res.json(states);
        } catch (error) {
            logError('GAME_STATE', 'Error al obtener estados de juego');
            res.status(500).json({ error: 'Error al obtener estados de juego' });
        }
    },

    // Obtener un estado por ID
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const state = await gameStateService.getById(id);

            if (!state) {
                logError('GAME_STATE', `Estado de juego no encontrado (ID: ${id})`);
                return res.status(404).json({ error: 'Estado de juego no encontrado' });
            }

            logInfo('GAME_STATE', `Estado de juego obtenido correctamente (ID: ${id})`);
            res.json(state);
        } catch (error) {
            logError('GAME_STATE', 'Error al obtener estado de juego');
            res.status(500).json({ error: 'Error al obtener estado de juego' });
        }
    },

    // Crear nuevo estado
    async create(req: Request, res: Response) {
        try {
            const { seasonId, currentPhase, globalEnergy, team0Energy, team1Energy } = req.body;
            const state = await gameStateService.create({ seasonId, currentPhase, globalEnergy, team0Energy, team1Energy });

            logInfo('GAME_STATE', `Estado de juego creado correctamente para la temporada ${seasonId}`);
            res.status(201).json(state);
        } catch (error: any) {
            logError('GAME_STATE', 'Error al crear estado de juego');
            res.status(400).json({ error: error.message || 'Error al crear estado de juego' });
        }
    },

    // Actualizar estado existente
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await gameStateService.update(id, data);

            logInfo('GAME_STATE', `Estado de juego actualizado correctamente (ID: ${id})`);
            res.json(updated);
        } catch (error: any) {
            logError('GAME_STATE', `Error al actualizar estado de juego (ID: ${req.params.id})`);
            res.status(400).json({ error: error.message || 'Error al actualizar estado de juego' });
        }
    },

    // Eliminar estado
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await gameStateService.delete(id);

            logInfo('GAME_STATE', `Estado de juego eliminado correctamente (ID: ${id})`);
            res.status(204).end();
        } catch (error: any) {
            logError('GAME_STATE', `Error al eliminar estado de juego (ID: ${req.params.id})`);
            res.status(400).json({ error: error.message || 'Error al eliminar estado de juego' });
        }
    },
};
