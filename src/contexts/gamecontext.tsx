import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Player = {
    username: string;
    address: string;
    energia: number;
    ataques: number;
    equipo: string;
};

type Action = {
    username: string;
    tipo: "juego" | "fuera";
    accion: string;
    fecha: string;
};

type GameContextType = {
    jugadores: Player[];
    acciones: Action[];
    setJugadores: React.Dispatch<React.SetStateAction<Player[]>>;
    setAcciones: React.Dispatch<React.SetStateAction<Action[]>>;
    fetchJugadores: () => Promise<void>;
    fetchAcciones: () => Promise<void>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [jugadores, setJugadores] = useState<Player[]>([]);
    const [acciones, setAcciones] = useState<Action[]>([]);

    // Simulación inicial
    useEffect(() => {
        setJugadores([
            {
                username: "FeerKing",
                address: "0x23baf83e12f88c1b12345efab",
                energia: 90,
                ataques: 12,
                equipo: "guepardo",
            },
            {
                username: "LunaWolf",
                address: "0x88ccf99231e4ddaa8899bbccf",
                energia: 45,
                ataques: 8,
                equipo: "oso",
            },
        ]);

        setAcciones([
            {
                username: "PlayerOne",
                tipo: "juego",
                accion: "Atacó una base enemiga",
                fecha: new Date().toLocaleString(),
            },
            {
                username: "AdminBot",
                tipo: "fuera",
                accion: "Actualizó recompensas diarias",
                fecha: new Date().toLocaleString(),
            },
        ]);
    }, []);

    // 🧠 Ejemplo de función para traer datos desde blockchain
    const fetchJugadores = async () => {
        console.log("Llamando a contrato para obtener jugadores...");
        // Aquí iría el fetch real con ethers.js o viem:
        // const data = await contract.getPlayers();
        // setJugadores(data);
    };

    const fetchAcciones = async () => {
        console.log("Llamando a contrato o API para obtener acciones...");
        // const data = await contract.getRecentActions();
        // setAcciones(data);
    };

    return (
        <GameContext.Provider
            value={{
                jugadores,
                acciones,
                setJugadores,
                setAcciones,
                fetchJugadores,
                fetchAcciones,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error("useGame debe usarse dentro de un GameProvider");
    return ctx;
};
