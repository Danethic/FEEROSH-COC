// src/services/gameService.ts
import { apiFetch } from "./apiClient";
import { Player, BattleAction, Action, SeasonState } from "../contexts/gamecontext";

export async function getJugadores(): Promise<Player[]> {
    const res = await apiFetch<Player[]>("/game/players");
    return res.data || [];
}

import { GameEvent } from "../contexts/gamecontext";

/**
 * 🔹 Obtiene todos los eventos de juego (batalla + sistema)
 */
export const getAcciones = async (): Promise<GameEvent[]> => {
    try {
        // 🧠 Aquí podrías hacer llamadas separadas a distintas fuentes:
        // - API central para acciones del sistema
        // - Blockchain o subgraph para acciones de batalla

        // 🔹 Simulación de datos de sistema
        const systemActions: Action[] = [
            {
                from: "AdminBot",
                tipo: "fuera",
                accion: "Inicio de temporada",
                fecha: new Date(Date.now() - 60000).toLocaleString(),
            },
            {
                from: "AdminBot",
                tipo: "fuera",
                accion: "Cambio de fase: Batalla abierta",
                fecha: new Date(Date.now() - 30000).toLocaleString(),
            },
        ];

        // 🔹 Simulación de batallas
        const battleActions: BattleAction[] = [
            {
                id: crypto.randomUUID(),
                from: "0xPlayerA",
                to: "0xPlayerB",
                tipo: "ataque",
                energiaGastada: 10,
                energiaImpacto: 20,
                resultado: "éxito",
                fecha: new Date().toLocaleString(),
            },
            {
                id: crypto.randomUUID(),
                from: "0xPlayerC",
                to: "0xPlayerD",
                tipo: "ataque",
                energiaGastada: 15,
                energiaImpacto: 30,
                resultado: "bloqueado",
                fecha: new Date().toLocaleString(),
            },
        ];

        // 🔹 Combinar todo bajo la estructura unificada GameEvent
        const combined: GameEvent[] = [
            ...systemActions.map((a) => ({ ...a, category: "system" as const })),
            ...battleActions.map((b) => ({ ...b, category: "battle" as const })),
        ];

        // 🔹 (Opcional) ordenar por fecha descendente
        const sorted = combined.sort(
            (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );

        return sorted;
    } catch (error) {
        console.error("Error obteniendo acciones del juego:", error);
        return [];
    }
};


export async function getSeasonState(): Promise<SeasonState> {
    const res = await apiFetch<SeasonState>("/game/season");
    return (
        res.data || {
            active: false,
            phase: "preseason",
        }
    );
}

export async function saveBattleAction(action: BattleAction) {
    const res = await apiFetch("/game/action", {
        method: "POST",
        body: JSON.stringify(action),
    });
    return res.success;
}

export async function startSeason(): Promise<boolean> {
    const res = await apiFetch("/game/season/start", { method: "POST" });
    return res.success;
}

export async function endSeason(): Promise<boolean> {
    const res = await apiFetch("/game/season/end", { method: "POST" });
    return res.success;
}
