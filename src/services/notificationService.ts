// src/services/notificationService.ts
import { apiFetch } from "./apiClient";

export interface Notification {
    id: string;
    title: string;
    message: string;
    to?: string;
    timestamp: string;
    read?: boolean;
}

export async function getNotifications(address?: string): Promise<Notification[]> {
    const endpoint = address ? `/notifications?user=${address}` : "/notifications";
    const res = await apiFetch<Notification[]>(endpoint);
    return res.data || [];
}

export async function sendNotification(message: string, to?: string) {
    const notification: Partial<Notification> = {
        title: "Notificación del juego",
        message,
        to,
        timestamp: new Date().toISOString(),
    };

    await apiFetch("/notifications", {
        method: "POST",
        body: JSON.stringify(notification),
    });
}
