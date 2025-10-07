import React, { createContext, useContext, useState, useEffect } from "react";

export type Notification = {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  seen: boolean;
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (title: string, message: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  unreadCount: number;
  pushEnabled: boolean;
  setPushEnabled: (v: boolean) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(
  undefined
);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pushEnabled, setPushEnabled] = useState(
    localStorage.getItem("pushEnabled") === "true"
  );

  // 🧠 Restaurar notificaciones previas
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: Notification) => !n.seen).length);
    }
  }, []);

  // 💾 Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // ➕ Agregar nueva notificación interna
  const addNotification = (title: string, message: string) => {
    const newNotif: Notification = {
      id: Date.now(),
      title,
      message,
      timestamp: new Date().toISOString(),
      seen: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  // ✅ Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, seen: true })));
    setUnreadCount(0);
  };

  // 🗑️ Borrar todo
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem("notifications");
  };

  // Guardar estado de push
  useEffect(() => {
    localStorage.setItem("pushEnabled", String(pushEnabled));
  }, [pushEnabled]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        clearNotifications,
        unreadCount,
        pushEnabled,
        setPushEnabled,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return ctx;
};
