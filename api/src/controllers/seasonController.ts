import { Request, Response } from 'express';
import { seasonService } from '../services/seasonService';
import { logInfo, logError, logWarn } from '../utils/logHelper';

export const seasonController = {
    async create(req: Request, res: Response) {
        try {
            const { name, startAt, endAt, prize } = req.body;
            const season = await seasonService.create({ name, startAt, endAt, prize });
            logInfo('SEASON', `Temporada creada correctamente: ${season.id} (${season.name})`);
            res.status(201).json(season);
        } catch (error: any) {
            logError('SEASON', `Error al crear temporada: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    },

    async getAll(_: Request, res: Response) {
        const seasons = await seasonService.getAll();
        logInfo('SEASON', `Se listaron ${seasons.length} temporadas`);
        res.json(seasons);
    },

    async getActive(_: Request, res: Response) {
        const activeSeason = await seasonService.getActive();
        if (!activeSeason) {
            logWarn('SEASON', 'No hay temporada activa actualmente');
            return res.json({});
        }
        logInfo('SEASON', `Temporada activa: ${activeSeason.name}`);
        res.json(activeSeason);
    },

    async updatePrize(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { prize } = req.body;
            const updated = await seasonService.updatePrize(id, prize);
            logInfo('SEASON', `Premio actualizado para temporada ${id} → nuevo premio: ${prize}`);
            res.json(updated);
        } catch (error: any) {
            logError('SEASON', `Error al actualizar premio de temporada ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    },

    async close(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const closed = await seasonService.close(id);
            logInfo('SEASON', `Temporada ${id} cerrada con premio final ${closed.finalPrize}`);
            res.json(closed);
        } catch (error: any) {
            logError('SEASON', `Error al cerrar temporada ${req.params.id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }
};
