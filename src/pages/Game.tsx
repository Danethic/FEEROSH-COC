import { IonPage, IonContent, IonButton, IonAvatar, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonText, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol, IonHeader, IonToolbar } from "@ionic/react";
import { arrowBackOutline, menu, help, bulb, chatbox, list, clipboard } from "ionicons/icons";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authcontext";
import { shortenAddress } from "../utils/format";
import { ChatBox } from "../components/ChatBox";
import { FloatingButton } from "../components/FloatingButton";

const Game: React.FC = () => {
    const history = useHistory();

    const { address } = useAuth();
    const [username] = useState(localStorage.getItem("username") || "Jugador");
    const [profileImage] = useState(localStorage.getItem("profileImage") || "");

    const walletAddress = address ? shortenAddress(address) : 'no conectado';

    const [activeView, setActiveView] = useState<'chat' | 'log' | 'tasks'>('chat');

    const renderActiveView = () => {
        switch (activeView) {
            case "chat":
                return <ChatBox className="game-chat" />;
            case "log":
                return (
                    <div className="placeholder-view">
                        <IonText>📜 Registro de actividades (próximamente)</IonText>
                    </div>
                );
            case "tasks":
                return (
                    <div className="placeholder-view">
                        <IonText>🧩 Tareas del juego (próximamente)</IonText>
                    </div>
                );
            default:
                return null;
        }
    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="gameToolBar">
                    <IonButton slot="start" className='backbutton' fill="clear" onClick={() => history.push('/tabs')}>
                        <IonIcon color="secondary" slot='' size={''} icon={arrowBackOutline} />
                    </IonButton>
                    <div className="game-center-header">
                        <IonAvatar slot="">
                            <img
                                src={profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt="profile"
                            />
                        </IonAvatar>
                        <IonText slot="">
                            {username || 'UserName'}
                            <p className="minitittle">{walletAddress}</p>
                        </IonText>
                    </div>

                    <IonButton slot="end" className="backbutton" fill="clear" >
                        <IonIcon color="secondary" slot='' size={''} icon={menu} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent className="game">
                <div className="content-game">


                    <IonCard className="global-energy">
                        <div className="team-logos-energy">
                            <IonAvatar className="teamA" > <img src={'src/svgs/guepardo_blank_space.svg'} /></IonAvatar>
                            <IonAvatar className="teamB"> <img src={'src/svgs/oso_blank_space.svg'} /></IonAvatar>
                        </div>
                        <div className="global-energy-bar">
                            <div className="goal"></div>
                            <div className="global-energy-fill" style={{ width: "calc(50% - 21px)" }}> </div>
                            <div className="impact" style={{ background: 'linear-gradient(90deg, #ffffff00, var(--ion-color-secondary) 50%, #ffffff00)' }}></div>
                        </div>
                    </IonCard>

                    <div className="bottom-space">

                        {/* 🔸 Zona dinámica (reemplaza al chat fijo) */}
                        <div className="chatzone">
                            {renderActiveView()}
                        </div>

                        {/* 🔸 Botones de cambio de vista */}
                        <IonSegment
                            value={activeView}
                            onIonChange={(e) => setActiveView(e.detail.value as 'chat' | 'tasks' | 'log')}
                            mode="ios"
                            className="view-toggle-segment">
                            <IonSegmentButton value="chat">
                                <IonIcon icon={chatbox} size="small" />
                            </IonSegmentButton>
                            <IonSegmentButton value="log">
                                <IonIcon icon={list} size="small" />
                            </IonSegmentButton>
                            <IonSegmentButton value="tasks">
                                <IonIcon icon={clipboard} size="small" />
                            </IonSegmentButton>
                        </IonSegment>
                        <IonCard className="user-panel">
                            <IonCardHeader>
                                <IonCardTitle className="subtitle">
                                    <div className="energy-bar">
                                        <div className="energy-fill" style={{ width: "50%" }}> </div>
                                    </div>
                                    <h5>ENERGY: 550/1800</h5>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="6">
                                            <IonButton color={'primary'}> básico </IonButton>
                                        </IonCol>
                                        <IonCol size="6">
                                            <IonButton color={'primary'}> cargado </IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12">
                                            <IonButton color={'primary'}> especial </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    </div>
                </div>
                <FloatingButton
                    icon={help}
                    side="left"
                    offset="25%"
                    color="var(--ion-color-secondary)"
                    background="var(--ion-color-primary)"
                    border="2px solid var(--ion-color-secondary)"
                />
                <FloatingButton
                    icon={bulb}
                    side="right"
                    offset="50%"
                    color="var(--ion-color-primary)"
                    background="var(--ion-color-secondary)"
                />
            </IonContent>
        </IonPage>
    );
};

export default Game;