import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./authcontext";

// type ChatType = "global" | "team" | "private";

export interface ChatMessage {
    id: string;
    from: string;
    to?: string;
    content: string;
    timestamp: number;
    chatType: string;
    read?: boolean;
}

export interface ChatUser {
    address: string;
    username: string;
    team?: "guepardo" | "oso" | null;
    isPlayer: boolean;
    profileImage?: string;
    online?: boolean;
}

interface ChatContextType {
    messages: ChatMessage[];
    users: ChatUser[];
    sendMessage: (chatType: string, content: string, recipient?: string) => void;
    getMessages: (chatType: string, recipient?: string) => ChatMessage[];
    markAsRead: (recipient: string) => void;
    getPrivateChats: () => string[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { address } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [users, setUsers] = useState<ChatUser[]>([
        { address: "0x123", username: "Fiera01", team: "guepardo", isPlayer: true, profileImage: "/assets/nfts/fiera1.png", online: true },
        { address: "0x456", username: "OsoMaster", team: "oso", isPlayer: true, profileImage: "/assets/nfts/sombra1.png", online: true },
        { address: "0x789", username: "Spectator", team: null, isPlayer: false, online: false },
    ]);

    useEffect(() => {
        // simulación de mensajes del servidor
        let types
        const interval = setInterval(() => {
            if (Math.random() < 0.08) {
                if (Math.random() < 0.5) {
                    types = 'global'
                } else {
                    types = 'team'
                }
                const randomUser = users[Math.floor(Math.random() * users.length)];
                const mock: ChatMessage = {
                    id: crypto.randomUUID(),
                    from: randomUser.address,
                    content: `Hola desde ${randomUser.username}!`,
                    timestamp: Date.now(),
                    chatType: types
                };
                setMessages((prev) => [...prev, mock]);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [users]);

    const sendMessage = (chatType: string, content: string, recipient?: string) => {
        if (!address) return;
        const msg: ChatMessage = {
            id: crypto.randomUUID(),
            from: address,
            to: recipient,
            content,
            timestamp: Date.now(),
            chatType,
            read: false,
        };
        setMessages((prev) => [...prev, msg]);
    };

    const getMessages = (chatType: string, recipient?: string) => {
        if (chatType === "global") return messages.filter((m) => m.chatType === "global");
        if (chatType === "team") {
            const userTeam = users.find((u) => u.address === address)?.team;
            return messages.filter((m) => m.chatType === "team" && users.find((u) => u.address === m.from)?.team === userTeam);
        }
        if (chatType === "private" && recipient)
            return messages.filter(
                (m) =>
                    m.chatType === "private" &&
                    ((m.from === address && m.to === recipient) || (m.from === recipient && m.to === address))
            );
        return [];
    };

    const markAsRead = (recipient: string) => {
        setMessages((msgs) =>
            msgs.map((m) =>
                m.chatType === "private" && m.from === recipient ? { ...m, read: true } : m
            )
        );
    };

    const getPrivateChats = () => {
        const chats = new Set<string>();
        messages
            .filter((m) => m.chatType === "private" && (m.from === address || m.to === address))
            .forEach((m) => chats.add(m.from === address ? m.to! : m.from));
        return Array.from(chats);
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                users,
                sendMessage,
                getMessages,
                markAsRead,
                getPrivateChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChat debe usarse dentro de ChatProvider");
    return ctx;
};
