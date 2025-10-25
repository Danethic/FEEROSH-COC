// src/services/apiClient.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.tubackend.com"; // ajusta al dominio real

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || `HTTP ${res.status}`);
        }

        const data = await res.json();
        return { success: true, data };
    } catch (err: any) {
        console.error(`[API ERROR] ${endpoint}:`, err.message);
        return { success: false, error: err.message };
    }
}
