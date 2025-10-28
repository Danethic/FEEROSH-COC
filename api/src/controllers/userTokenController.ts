import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { logInfo, logError, logWarn } from '../utils/logHelper';

// Obtener todos los tokens
export const getAllUserTokens = async (req: Request, res: Response) => {
    try {
        const tokens = await prisma.userToken.findMany({
            include: { user: true },
        });

        logInfo('USER_TOKEN', `Listado de tokens obtenido correctamente. Total: ${tokens.length}`);
        res.json(tokens);
    } catch (error: any) {
        logError('USER_TOKEN', `Error al obtener listado de tokens: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener tokens' });
    }
};

// Crear token
export const createUserToken = async (req: Request, res: Response) => {
    try {
        const { userId, tokenContractId, tokenId, amount, tokenType, metadata } = req.body;

        const newToken = await prisma.userToken.create({
            data: { userId, tokenContractId, tokenId, amount, tokenType, metadata },
        });

        logInfo('USER_TOKEN', `Token creado correctamente con ID ${newToken.id} para usuario ${userId}`);
        res.status(201).json(newToken);
    } catch (error: any) {
        logError('USER_TOKEN', `Error al crear token: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Obtener token por ID
export const getUserTokenById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const token = await prisma.userToken.findUnique({
            where: { id },
            include: { user: true },
        });

        if (!token) {
            logWarn('USER_TOKEN', `Token no encontrado con ID ${id}`);
            return res.status(404).json({ error: 'Token no encontrado' });
        }

        logInfo('USER_TOKEN', `Token obtenido correctamente con ID ${id}`);
        res.json(token);
    } catch (error: any) {
        logError('USER_TOKEN', `Error al obtener token por ID: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener token' });
    }
};

// Actualizar token
export const updateUserToken = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { amount, metadata } = req.body;

        const updatedToken = await prisma.userToken.update({
            where: { id },
            data: { amount, metadata },
        });

        logInfo('USER_TOKEN', `Token actualizado correctamente. ID: ${id}, Nuevo amount: ${amount}`);
        res.json(updatedToken);
    } catch (error: any) {
        logError('USER_TOKEN', `Error al actualizar token ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error al actualizar token' });
    }
};

// Eliminar token
export const deleteUserToken = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.userToken.delete({ where: { id } });

        logInfo('USER_TOKEN', `Token eliminado correctamente. ID: ${id}`);
        res.status(204).send();
    } catch (error: any) {
        logError('USER_TOKEN', `Error al eliminar token ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error al eliminar token' });
    }
};
