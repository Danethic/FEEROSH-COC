// src/services/tokenService.ts
import { apiFetch } from "./apiClient";
import { TokenData } from "../contexts/gamecontext";

export async function getTokenData(): Promise<TokenData> {
    const res = await apiFetch<TokenData>("/token/data");
    return (
        res.data || {
            price: 0,
            change1h: 0,
            volume: 0,
            marketCap: 0,
        }
    );
}

export async function getPrizePool(): Promise<number> {
    const res = await apiFetch<{ prizePool: number }>("/token/prizepool");
    return res.data?.prizePool || 0;
}
