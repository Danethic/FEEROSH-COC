import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { logInfo, logError } from '../utils/logHelper';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        logInfo('USER', `Usuarios obtenidos correctamente. Total: ${users.length}`);
        res.json(users);
    } catch (error) {
        logError('USER', 'Error al obtener usuarios');
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { walletAddress, username } = req.body;

        if (!walletAddress || !username) {
            logError('USER', 'Faltan campos requeridos: walletAddress o username');
            return res.status(400).json({ error: 'address y username son obligatorios' });
        }

        const newUser = await prisma.user.create({
            data: { walletAddress, username },
        });

        logInfo('USER', `Usuario creado correctamente (Wallet: ${walletAddress})`);
        res.status(201).json(newUser);
    } catch (error: any) {
        logError('USER', 'Error al crear usuario');
        res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            logError('USER', `Usuario no encontrado (ID: ${id})`);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        logInfo('USER', `Usuario obtenido correctamente (ID: ${id})`);
        res.json(user);
    } catch (error) {
        logError('USER', 'Error al obtener usuario por ID');
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, teamAssignment } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { username, teamAssignment },
        });

        logInfo('USER', `Usuario actualizado correctamente (ID: ${id})`);
        res.json(updatedUser);
    } catch (error) {
        logError('USER', `Error al actualizar usuario (ID: ${req.params.id})`);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });

        logInfo('USER', `Usuario eliminado correctamente (ID: ${id})`);
        res.status(204).send();
    } catch (error) {
        logError('USER', `Error al eliminar usuario (ID: ${req.params.id})`);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};
