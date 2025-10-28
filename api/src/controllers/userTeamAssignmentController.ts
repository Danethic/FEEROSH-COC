import { Request, Response } from 'express';
import { userTeamAssignmentService } from '../services/userTeamAssignmentService';
import { logInfo, logWarn, logError } from '../utils/logHelper';

export const userTeamAssignmentController = {
    async getAll(req: Request, res: Response) {
        try {
            const assignments = await userTeamAssignmentService.getAll();
            logInfo('USER_TEAM_ASSIGNMENT', `Listado de asignaciones obtenido correctamente (count: ${assignments.length})`);
            res.json(assignments);
        } catch (error: any) {
            logError('USER_TEAM_ASSIGNMENT', `Error al obtener todas las asignaciones (error: ${error.message})`);
            res.status(500).json({ error: 'Error al obtener asignaciones' });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const assignment = await userTeamAssignmentService.getById(id);

            if (!assignment) {
                logWarn('USER_TEAM_ASSIGNMENT', `Asignación no encontrada: ${id}`);
                return res.status(404).json({ error: 'Not found' });
            }

            logInfo('USER_TEAM_ASSIGNMENT', `Asignación no encontrada: ${id}`);
            res.json(assignment);
        } catch (error: any) {
            logError('USER_TEAM_ASSIGNMENT', `Error al obtener asignación por ID (error: ${error.message})`);
            res.status(500).json({ error: 'Error al obtener asignación' });
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { userId, seasonId, teamIndex } = req.body;

            const newAssignment = await userTeamAssignmentService.create({
                userId,
                seasonId,
                teamIndex
            });

            logInfo('USER_TEAM_ASSIGNMENT', `Nueva asignación creada correctamente( id: ${newAssignment.id},
                ${userId},
                ${seasonId},
                ${teamIndex})`);

            res.status(201).json(newAssignment);
        } catch (error: any) {
            logError('USER_TEAM_ASSIGNMENT', `Error al crear nueva asignación (error: ${error.message}, body: ${req.body})`);
            res.status(400).json({ error: error.message });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { teamIndex } = req.body;

            const updated = await userTeamAssignmentService.update(id, { teamIndex });

            logInfo('USER_TEAM_ASSIGNMENT', `Asignación actualizada correctamente: ${id},
                ${teamIndex}`);

            res.json(updated);
        } catch (error: any) {
            logError('USER_TEAM_ASSIGNMENT', `Error al actualizar asignación  error: ${error.message} id: ${req.params.id}`);
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userTeamAssignmentService.delete(id);

            logInfo('USER_TEAM_ASSIGNMENT', `Asignación eliminada correctamente: ${id}`);
            res.status(204).end();
        } catch (error: any) {
            logError('USER_TEAM_ASSIGNMENT', `Error al eliminar asignación (error: ${error.message} ${req.params.id})`);
            res.status(400).json({ error: error.message });
        }
    },
};
