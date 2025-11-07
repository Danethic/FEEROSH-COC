import prisma from '../prisma/client';

export const seasonService = {
    async create({ name, startAt, endAt, prize }: any) {
        return prisma.season.create({
            data: {
                name,
                startAt: new Date(startAt),
                endAt: new Date(endAt),
                prize,
                initialPrize: prize,
            },
        });
    },

    async getAll() {
        return prisma.season.findMany({
            orderBy: { startAt: 'desc' },
        });
    },

    async getActive() {
        const now = new Date();
        return prisma.season.findFirst({
            where: {
                startAt: { lte: now },
                endAt: { gte: now },
            },
        });
    },

    async updatePrize(id: string, prize: number) {
        return prisma.season.update({
            where: { id },
            data: { prize },
        });
    },

    async close(id: string) {
        const season = await prisma.season.findUnique({ where: { id } });
        if (!season) throw new Error('Season not found');

        return prisma.season.update({
            where: { id },
            data: { finalPrize: season.prize ?? 0 },
        });
    },
};
