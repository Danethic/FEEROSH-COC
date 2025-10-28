import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { logInfo, logError, logWarn } from '../utils/logHelper';

const prisma = new PrismaClient();

// Obtener todos los contratos
export const getContracts = async (req: Request, res: Response) => {
    try {
        const contracts = await prisma.web3Contract.findMany();
        logInfo('WEB3_CONTRACT', `Contratos obtenidos correctamente. Total: ${contracts.length}`);
        res.json(contracts);
    } catch (error: any) {
        logError('WEB3_CONTRACT', `Error al obtener contratos: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

// Crear nuevo contrato
export const createContract = async (req: Request, res: Response) => {
    try {
        const { name, contractAddress, network, abi, metadata } = req.body;

        const contract = await prisma.web3Contract.create({
            data: { name, contractAddress, network, abi, metadata },
        });

        logInfo('WEB3_CONTRACT', `Contrato creado correctamente con ID ${contract.id} en red ${network}`);
        res.status(201).json(contract);
    } catch (error: any) {
        logError('WEB3_CONTRACT', `Error al crear contrato: ${error.message}`);
        res.status(500).json({ error: 'Error al crear contrato' });
    }
};

// Obtener contrato por ID
export const getContractById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contract = await prisma.web3Contract.findUnique({ where: { id } });

        if (!contract) {
            logWarn('WEB3_CONTRACT', `Contrato no encontrado con ID ${id}`);
            return res.status(404).json({ error: 'Contrato no encontrado' });
        }

        logInfo('WEB3_CONTRACT', `Contrato obtenido correctamente con ID ${id}`);
        res.json(contract);
    } catch (error: any) {
        logError('WEB3_CONTRACT', `Error al obtener contrato por ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error al obtener contrato' });
    }
};

// Actualizar contrato
export const updateContract = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, contractAddress, network, abi, metadata } = req.body;

        const updated = await prisma.web3Contract.update({
            where: { id },
            data: { name, contractAddress, network, abi, metadata },
        });

        logInfo('WEB3_CONTRACT', `Contrato actualizado correctamente. ID: ${id}, Nombre: ${updated.name}`);
        res.json(updated);
    } catch (error: any) {
        logError('WEB3_CONTRACT', `Error al actualizar contrato ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error al actualizar contrato' });
    }
};

// Eliminar contrato
export const deleteContract = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.web3Contract.delete({ where: { id } });
        logInfo('WEB3_CONTRACT', `Contrato eliminado correctamente con ID ${id}`);
        res.json({ message: 'Contrato eliminado correctamente' });
    } catch (error: any) {
        logError('WEB3_CONTRACT', `Error al eliminar contrato ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: 'Error al eliminar contrato' });
    }
};
