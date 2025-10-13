import React, { useRef } from "react";
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonText,
    createAnimation
} from "@ionic/react";
import { closeOutline, lockClosedOutline, peopleOutline } from "ionicons/icons";
import { ChatBox } from "./ChatBox";
import { useAuth } from "../contexts/authcontext";
import { useChat } from "../contexts/chatcontext";

import './ChatSidePanel.css'

interface ChatSidePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChatSidePanel: React.FC<ChatSidePanelProps> = ({ isOpen, onClose }) => {
    const { address } = useAuth();
    const { users } = useChat();

    const currentUser = users.find((u) => u.address === address);
    const isPlayer = currentUser?.isPlayer;
    const hasTeam = !!currentUser?.team;

    const enterAnimation = (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot;

        const backdropAnimation = createAnimation()
            .addElement(root?.querySelector('ion-backdrop')!)
            .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = createAnimation()
            .addElement(root?.querySelector('.modal-wrapper')!)
            .keyframes([
                { offset: 0, opacity: '0', transform: 'translateX(-100%)' },
                { offset: 1, opacity: '1', transform: 'translateX(0)' },
            ]);

        return createAnimation()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(400)
            .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: HTMLElement) => {
        return enterAnimation(baseEl).direction('reverse');
    };

    return (
        <IonModal
            id="chat-side-panel"
            isOpen={isOpen}
            onDidDismiss={onClose}
            animated={true}
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
        >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="chat-panel-content">
                {/* 🔒 Usuario no conectado */}
                {!address && (
                    <div className="chat-lock">
                        <IonIcon icon={lockClosedOutline} size="large" />
                        <IonText>
                            <h3>Conecta tu wallet para acceder al chat</h3>
                        </IonText>
                    </div>
                )}

                {/* ⚙️ Usuario sin equipo */}
                {address && isPlayer && !hasTeam && (
                    <div className="chat-lock">
                        <IonIcon icon={peopleOutline} size="large" />
                        <IonText>
                            <h3>Selecciona un equipo para acceder al chat grupal</h3>
                        </IonText>
                        <p className="minitittle">Podrás seguir usando el chat global</p>
                        <ChatBox />
                    </div>
                )}

                {/* 🟢 Usuario con equipo */}
                {address && !isPlayer && !hasTeam && <ChatBox />}

                {/* 👀 Usuario conectado pero no jugador 
                {address && !isPlayer && (
                    <div className="chat-lock">
                        <IonIcon icon={lockClosedOutline} size="large" />
                        <IonText>
                            <h3>El chat grupal es solo para jugadores</h3>
                        </IonText>
                        <p className="minitittle">Aún puedes participar en el chat global</p>
                        <ChatBox />
                    </div>
                )}*/}
            </IonContent>
        </IonModal>
    );
};
