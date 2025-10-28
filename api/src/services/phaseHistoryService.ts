import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const phaseHistoryService = {
    async getAll() {
        return prisma.phaseHistory.findMany({
            include: {
                gameState: true,
                changedByUser: true,
            },
        });
    },

    async getById(id: string) {
        return prisma.phaseHistory.findUnique({
            where: { id },
            include: {
                gameState: true,
                changedByUser: true,
            },
        });
    },

    async create(data: {
        gameStateId: string;
        fromPhase: number;
        toPhase: number;
        changedByUserId?: string;
        metadata?: object;
    }) {
        return prisma.phaseHistory.create({
            data,
        });
    },

    async delete(id: string) {
        return prisma.phaseHistory.delete({
            where: { id },
        });
    },
};
