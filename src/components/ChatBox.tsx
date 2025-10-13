import React, { useState } from "react";
import {
    IonSegment, IonSegmentButton, IonLabel,
    IonList, IonItem, IonAvatar, IonButton, IonIcon,
    IonTextarea, IonContent, IonGrid, IonRow, IonCol, IonSegmentView,
    IonSegmentContent
} from "@ionic/react";
import { send, people, personCircle } from "ionicons/icons";
import { useChat } from "../contexts/chatcontext";
import { shortenAddress } from "../utils/format";

import './ChatBox.css'

interface ChatBoxProps {
    mode?: "full" | "compact";
}

export const ChatBox: React.FC<ChatBoxProps> = ({ mode = "full" }) => {
    const { sendMessage, getMessages, users, getPrivateChats, markAsRead } = useChat();
    const [tab, setTab] = useState<"global" | "team" | "private">("global");
    const [recipient, setRecipient] = useState<string | null>(null);
    const [input, setInput] = useState("");

    const globalMessages = getMessages(tab, recipient || undefined);
    const privateChats = getPrivateChats();

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(tab, input, recipient || undefined);
        setInput("");
    };

    const handleSelectUser = (addr: string) => {
        setTab("private");
        setRecipient(addr);
        markAsRead(addr);
    };

    return (
        <IonContent className="chatbox">
            <IonSegment mode="ios" onIonChange={(e) => setTab(e.detail.value as 'global' | 'team')}>
                <IonSegmentButton value="global"><IonLabel>Global</IonLabel></IonSegmentButton>
                <IonSegmentButton value="team"><IonLabel>Equipo</IonLabel></IonSegmentButton>
            </IonSegment>
            <IonSegmentContent id="global">
                <IonList className="messages">
                    {globalMessages.map((m) => (
                        <IonItem key={m.id} lines="none" color="none">
                            <IonAvatar slot="start">
                                <img src={users.find((u) => u.address === m.from)?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
                            </IonAvatar>
                            <IonLabel className="ion-text-wrap">
                                <h3>{users.find((u) => u.address === m.from)?.username || shortenAddress(m.from)}</h3>
                                <p>{m.content}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonSegmentContent>

            {/* menú horizontal de chats privados */}
            <div className="private-bar">
                {privateChats.map((addr) => {
                    const user = users.find((u) => u.address === addr);
                    return (
                        <IonButton key={addr} fill="clear" onClick={() => handleSelectUser(addr)}>
                            <IonAvatar>
                                <img src={user?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
                            </IonAvatar>
                        </IonButton>
                    );
                })}
            </div>

            <IonGrid className="chat-input">
                <IonRow>
                    <IonCol size="10">
                        <IonTextarea
                            placeholder="Escribe un mensaje..."
                            autoGrow
                            value={input}
                            onIonInput={(e) => setInput(e.detail.value!)}
                        />
                    </IonCol>
                    <IonCol size="2">
                        <IonButton expand="block" onClick={handleSend}>
                            <IonIcon icon={send} />
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent >
    );
};
