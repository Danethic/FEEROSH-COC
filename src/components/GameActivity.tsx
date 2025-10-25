import React from "react";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { flash, flame } from "ionicons/icons";
import { useGame } from "../contexts/gamecontext";

import './GameActivity.css'

export const GameActivity: React.FC = () => {
    const { acciones } = useGame();

    return (
        <div className="activity-container">
            <IonList>
                {acciones.map((a, idx) => (
                    <IonItem
                        key={idx}
                        color="none"
                        lines="none"
                        style={{
                            backgroundColor:
                                a.tipo === "juego"
                                    ? "color-mix(in srgb, var(--ion-color-danger) 50%, transparent)"
                                    : "color-mix(in srgb, var(--ion-color-warning) 50%, transparent)",
                        }}
                    >
                        <IonLabel>
                            <h3>{a.username}</h3>
                            <p>{a.accion}</p>
                            <p style={{ fontSize: "0.7rem", opacity: 0.7 }}>{a.fecha}</p>
                        </IonLabel>
                        <IonIcon
                            icon={a.tipo === "juego" ? flash : flame}
                            color={a.tipo === "juego" ? "secondary" : "success"}
                        />
                    </IonItem>
                ))}
            </IonList>
        </div>
    );
};
