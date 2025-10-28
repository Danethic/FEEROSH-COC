import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { logInfo, logError } from "../utils/logHelper";

const prisma = new PrismaClient();

// ✅ Crear un nuevo equipo
export const createSeasonTeam = async (req: Request, res: Response) => {
    try {
        const { seasonId, teamIndex, teamName } = req.body;
        logInfo("SEASON_TEAM", `Intentando crear equipo para temporada ${seasonId} con índice ${teamIndex}`);

        if (teamIndex !== 0 && teamIndex !== 1) {
            logError("SEASON_TEAM", `Índice inválido recibido: ${teamIndex}`);
            return res.status(400).json({ error: "El índice del equipo debe ser 0 o 1." });
        }

        const existingTeams = await prisma.seasonTeam.count({ where: { seasonId } });
        if (existingTeams >= 2) {
            logError("SEASON_TEAM", `Intento de crear un tercer equipo en temporada ${seasonId}`);
            return res.status(400).json({ error: "Cada temporada solo puede tener dos equipos." });
        }

        const duplicateIndex = await prisma.seasonTeam.findFirst({ where: { seasonId, teamIndex } });
        if (duplicateIndex) {
            logError("SEASON_TEAM", `Duplicado detectado: índice ${teamIndex} ya existe en temporada ${seasonId}`);
            return res.status(400).json({ error: `El equipo con índice ${teamIndex} ya existe.` });
        }

        const seasonTeam = await prisma.seasonTeam.create({
            data: { seasonId, teamIndex, teamName },
        });

        logInfo("SEASON_TEAM", `Equipo creado correctamente en temporada ${seasonId}: ${JSON.stringify(seasonTeam)}`);
        res.status(201).json(seasonTeam);
    } catch (err: any) {
        logError("SEASON_TEAM", `Error al crear equipo: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

// ✅ Obtener equipos de una temporada
export const getSeasonTeams = async (req: Request, res: Response) => {
    try {
        const { seasonId } = req.params;
        logInfo("SEASON_TEAM", `Consultando equipos para temporada ${seasonId}`);

        const teams = await prisma.seasonTeam.findMany({ where: { seasonId } });

        logInfo("SEASON_TEAM", `Equipos obtenidos para temporada ${seasonId}: ${JSON.stringify(teams)}`);
        res.json(teams);
    } catch (err: any) {
        logError("SEASON_TEAM", `Error al obtener equipos de temporada: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};
