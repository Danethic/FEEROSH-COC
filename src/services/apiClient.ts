/**
 * src/services/apiClient.ts
 * Cliente HTTP genérico para la comunicación con el backend REST.
 * Seguro, tipado y preparado para entornos dev/prod.
 */

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    status?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';
const IS_DEV = import.meta.env.DEV;

// 🔒 Validación temprana
if (!API_BASE_URL) {
    throw new Error(
        '[apiClient] Variable de entorno VITE_API_URL no definida. ' +
        'Agrega un archivo .env con VITE_API_URL="https://api.tudominio.com"'
    );
}

const BASE_PATH = `${API_BASE_URL.replace(/\/$/, '')}/${API_VERSION}`;

/**
 * Petición HTTP genérica tipada
 */
export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith('http')
        ? endpoint
        : `${BASE_PATH}/${endpoint.replace(/^\/+/, '')}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        const response = await fetch(url, { ...options, headers });
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            const message =
                typeof data === 'string'
                    ? data
                    : data?.error || `Error ${response.status}`;
            if (IS_DEV) console.error(`[API] ${url} → ${message}`);
            return { success: false, error: message, status: response.status };
        }

        return { success: true, data, status: response.status };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (IS_DEV) console.error(`[API] ${url} → Network error: ${message}`);
        return { success: false, error: message };
    }
}

/**
 * Métodos abreviados REST comunes
 */
export const apiClient = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        apiFetch<T>(endpoint, { ...options, method: 'GET' }),

    post: <T, B = unknown>(endpoint: string, body?: B, options?: RequestInit) =>
        apiFetch<T>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body ?? {}),
        }),

    put: <T, B = unknown>(endpoint: string, body?: B, options?: RequestInit) =>
        apiFetch<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body ?? {}),
        }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
