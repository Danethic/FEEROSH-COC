import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userTeamAssignmentService = {
    async getAll() {
        return prisma.userTeamAssignment.findMany({
            include: { user: true, season: true },
        });
    },

    async getById(id: string) {
        return prisma.userTeamAssignment.findUnique({
            where: { id },
            include: { user: true, season: true },
        });
    },

    async create(data: {
        userId: string;
        seasonId: string;
        teamIndex: number;
    }) {
        return prisma.userTeamAssignment.create({ data });
    },

    async update(id: string, data: Partial<{ teamIndex: number }>) {
        return prisma.userTeamAssignment.update({ where: { id }, data });
    },

    async delete(id: string) {
        return prisma.userTeamAssignment.delete({ where: { id } });
    },
};
