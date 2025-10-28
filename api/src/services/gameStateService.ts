import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const gameStateService = {
    async getAll() {
        return prisma.gameState.findMany({
            include: { season: true },
        });
    },

    async getById(id: string) {
        return prisma.gameState.findUnique({
            where: { id },
            include: { season: true },
        });
    },

    async create(data: {
        seasonId?: string;
        currentPhase?: number;
        globalEnergy?: bigint;
        team0Energy?: bigint;
        team1Energy?: bigint;
    }) {
        return prisma.gameState.create({ data });
    },

    async update(id: string, data: Partial<{
        currentPhase: number;
        globalEnergy: bigint;
        team0Energy: bigint;
        team1Energy: bigint;
        phaseChangeCount: bigint;
        phaseChangedAt: Date;
    }>) {
        return prisma.gameState.update({ where: { id }, data });
    },

    async delete(id: string) {
        return prisma.gameState.delete({ where: { id } });
    },
};
