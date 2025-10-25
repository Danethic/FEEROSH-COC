// src/contexts/gamecontext.tsx
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { useAuth } from "./authcontext";

// 🔧 Servicios principales
import {
    getJugadores,
    getAcciones,
    getSeasonState,
} from "../services/gameServices";
import { getTokenData, getPrizePool } from "../services/tokenService";
import { blockchainService } from "../services/blockchainService";
import { marketplaceService, NFTItem } from "../services/marketplaceService";
// import { getAIUpdates } from "../services/aiService";
import { sendNotification } from "../services/notificationService";

// -----------------------------
// 🧩 Tipos principales
// -----------------------------
export interface Player {
    username: string;
    address: string;
    energia: number;
    energiaMax: number;
    equipo: "guepardo" | "oso";
    ataquesDisponibles: number;
    defensasDisponibles: number;
    isOnline: boolean;
}

export interface BattleAction {
    id: string;
    from: string;
    to: string;
    tipo: "ataque" | "defensa";
    energiaGastada: number;
    energiaImpacto: number;
    resultado?: "éxito" | "bloqueado" | "fallo";
    fecha: string;
}

export interface Action {
    from: string;
    tipo: "juego" | "fuera";
    accion: string;
    fecha: string;
}

export interface TokenData {
    price: number;
    change1h: number;
    volume: number;
    marketCap: number;
}

export interface SeasonState {
    active: boolean;
    phase: string;
    startDate?: string;
    endDate?: string;
}

export type GameEvent =
    | (Action & { category: 'system' })
    | (BattleAction & { category: 'battle' });

interface GameContextType {
    jugadores: Player[];
    acciones: GameEvent[];
    tokenData: TokenData | null;
    prizePool: number;
    season: SeasonState;
    loading: boolean;

    refreshGameData: () => Promise<void>;
    fetchJugadores: () => Promise<void>;
    fetchAcciones: () => Promise<void>;
    startSeason: () => Promise<void>;
    endSeason: () => Promise<void>;
    performAction: (action: Action) => Promise<void>;
    executeBattleAction: (
        attackerAddr: string,
        targetAddr: string,
        energiaGastada: number
    ) => Promise<BattleAction | null>;
    executeDefenseAction: (
        defenderAddr: string,
        attackerAddr: string
    ) => Promise<void>;
}

// -----------------------------
// 🧩 Contexto principal
// -----------------------------
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { address } = useAuth();

    const [jugadores, setJugadores] = useState<Player[]>([]);
    const [acciones, setAcciones] = useState<GameEvent[]>([]);
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const [prizePool, setPrizePool] = useState<number>(0);
    const [season, setSeason] = useState<SeasonState>({
        active: false,
        phase: "preseason",
    });
    const [loading, setLoading] = useState<boolean>(false);

    const [energiaGlobal, setEnergiaGlobal] = useState<{
        guepardo: number;
        oso: number;
    }>({ guepardo: 0, oso: 0 });

    const [userAssets, setUserAssets] = useState<{
        tokenBalance?: string;
        nfts?: NFTItem[];
        rewardPool?: string;
    }>({});

    // -----------------------------
    // 🧭 Efecto inicial
    // -----------------------------
    useEffect(() => {
        if (!address) return;
        (async () => {
            await Promise.all([refreshGameData(), loadUserAssets()]);
        })();
    }, [address]);

    // -----------------------------
    // ⚡ Actualiza energía global
    // -----------------------------
    const updateGlobalEnergy = (players: Player[]) => {
        const energiaGuepardo = players
            .filter((p) => p.equipo === "guepardo")
            .reduce((sum, p) => sum + p.energia, 0);
        const energiaOso = players
            .filter((p) => p.equipo === "oso")
            .reduce((sum, p) => sum + p.energia, 0);
        setEnergiaGlobal({ guepardo: energiaGuepardo, oso: energiaOso });
    };

    // -----------------------------
    // 🔁 Refrescar datos globales
    // -----------------------------
    const refreshGameData = async () => {
        setLoading(true);
        try {
            const [players, actions, token, pool, state] = await Promise.all([
                getJugadores(),
                getAcciones(),
                getTokenData(),
                getPrizePool(),
                getSeasonState(),
            ]);

            setJugadores(players);
            setAcciones(actions);
            setTokenData(token);
            setPrizePool(pool);
            setSeason(state);
            updateGlobalEnergy(players);
        } catch (err) {
            console.error("[ERROR] Falló la actualización de datos:", err);
        } finally {
            setLoading(false);
        }
    };

    // -----------------------------
    // 🧩 Fetches individuales
    // -----------------------------
    const fetchJugadores = async () => {
        try {
            const data = await getJugadores();
            setJugadores(data);
            updateGlobalEnergy(data);
        } catch (err) {
            console.error("Error al obtener jugadores:", err);
        }
    };

    const fetchAcciones = async () => {
        try {
            const data = await getAcciones();
            setAcciones(data);
        } catch (err) {
            console.error("Error al obtener acciones:", err);
        }
    };

    // -----------------------------
    // 🕹️ Gestión de temporada
    // -----------------------------
    const startSeason = async () => {
        console.log("⚡ Iniciando temporada...");
        await performAction({
            from: "AdminBot",
            tipo: "fuera",
            accion: "Inicio de temporada",
            fecha: new Date().toLocaleString(),
        });
        setSeason({ active: true, phase: "active", startDate: new Date().toISOString() });
    };

    const endSeason = async () => {
        console.log("⏹️ Finalizando temporada...");
        await performAction({
            from: "AdminBot",
            tipo: "fuera",
            accion: "Fin de temporada",
            fecha: new Date().toLocaleString(),
        });
        setSeason({ active: false, phase: "ended", endDate: new Date().toISOString() });
    };

    // -----------------------------
    // 🪄 Registro de acciones
    // -----------------------------
    const performAction = async (action: Action) => {
        const systemEvent: GameEvent = {
            ...action,
            category: "system",
        };

        setAcciones((prev) => [systemEvent, ...prev]);

        try {
            // await getAIUpdates(action);
            await sendNotification(`Nueva acción: ${action.accion}`);
        } catch (err) {
            console.error("Error procesando acción:", err);
        }
    };


    // -----------------------------
    // ⚔️ Acción de ataque
    // -----------------------------
    const executeBattleAction = async (
        attackerAddr: string,
        targetAddr: string,
        energiaGastada: number
    ): Promise<BattleAction | null> => {
        const attacker = jugadores.find((j) => j.address === attackerAddr);
        const target = jugadores.find((j) => j.address === targetAddr);
        if (!attacker || !target) return null;

        if (attacker.equipo === target.equipo) return null;
        if (attacker.energia < energiaGastada) return null;
        if (attacker.ataquesDisponibles <= 0) return null;

        const energiaImpacto = energiaGastada * 2;
        let resultado: "éxito" | "bloqueado" = "éxito";
        let energiaPerdida = energiaImpacto;

        await sendNotification(`¡Has sido atacado por ${attacker.username}!`, target.address);

        const defenderAuto = target.isOnline && target.defensasDisponibles > 0;
        if (defenderAuto) {
            resultado = "bloqueado";
            energiaPerdida = energiaGastada;
        }

        const updatedJugadores = jugadores.map((j) => {
            if (j.address === attacker.address)
                return {
                    ...j,
                    energia: j.energia - energiaGastada,
                    ataquesDisponibles: j.ataquesDisponibles - 1,
                };
            if (j.address === target.address)
                return {
                    ...j,
                    energia: Math.max(0, j.energia - energiaPerdida),
                    defensasDisponibles: defenderAuto
                        ? j.defensasDisponibles - 1
                        : j.defensasDisponibles,
                };
            return j;
        });

        setJugadores(updatedJugadores);
        updateGlobalEnergy(updatedJugadores);

        const action: BattleAction = {
            id: crypto.randomUUID(),
            from: attacker.address,
            to: target.address,
            tipo: "ataque",
            energiaGastada,
            energiaImpacto,
            resultado,
            fecha: new Date().toLocaleString(),
        };

        setAcciones((prev) => [
            { ...action, category: "battle" },
            ...prev,
        ]);

        // Notifica
        sendNotification(`¡${attacker.username} atacó a ${target.username}!`);

        return action;
    };
    // -----------------------------
    // 🛡️ Acción de defensa
    // -----------------------------
    const executeDefenseAction = async (
        defenderAddr: string,
        attackerAddr: string
    ) => {
        const defender = jugadores.find((j) => j.address === defenderAddr);
        if (!defender || defender.defensasDisponibles <= 0) return;

        setJugadores((prev) =>
            prev.map((j) =>
                j.address === defender.address
                    ? { ...j, defensasDisponibles: j.defensasDisponibles - 1 }
                    : j
            )
        );

        await sendNotification(`Defensa activada por ${defender.username}!`, attackerAddr);
    };

    // -----------------------------
    // 💎 Carga de activos del usuario
    // -----------------------------
    const loadUserAssets = async () => {
        if (!address) return;

        try {
            console.log("[DEBUG] Cargando activos del usuario...");

            const [tokenBalance, nfts, rewardPool] = await Promise.all([
                blockchainService.getTokenBalance(address),
                marketplaceService.getUserNFTs(address),
                blockchainService.getRewardPool(),
            ]);

            setUserAssets({ tokenBalance, nfts, rewardPool });
            console.log("[DEBUG] Activos del usuario actualizados.");
        } catch (err) {
            console.error("[ERROR] Error obteniendo assets del usuario:", err);
        }
    };

    // -----------------------------
    // 📦 Contexto exportado
    // -----------------------------
    return (
        <GameContext.Provider
            value={{
                jugadores,
                acciones,
                tokenData,
                prizePool,
                season,
                loading,
                refreshGameData,
                fetchJugadores,
                fetchAcciones,
                startSeason,
                endSeason,
                performAction,
                executeBattleAction,
                executeDefenseAction,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

// -----------------------------
// ⚙️ Hook de acceso
// -----------------------------
export const useGame = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame debe usarse dentro de un GameProvider");
    return ctx;
};
