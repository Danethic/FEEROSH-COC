import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
} from "@ionic/react";
import { useNotifications } from "../contexts/notificationscontext";

import '../theme/global.css'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markAllAsRead, clearNotifications } = useNotifications();

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      id="notifications-modal"
      className="notifications-modal"
      slot="end"
      backdropDismiss={true}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={clearNotifications}
            color="danger"
          >
            Limpiar
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {notifications.length === 0 ? (
            <IonItem lines="none">
              <IonLabel>
                <IonText color="medium">Sin notificaciones aún</IonText>
              </IonLabel>
            </IonItem>
          ) : (
            notifications.map((notif) => (
              <IonItem
                key={notif.id}
                color={notif.seen ? "none" : "light"}
                lines="none"
              >
                <IonLabel>
                  <h2>{notif.title}</h2>
                  <p>{notif.message}</p>
                  <IonText color="medium" style={{ fontSize: "0.75rem" }}>
                    {new Date(notif.timestamp).toLocaleString()}
                  </IonText>
                </IonLabel>
              </IonItem>
            ))
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
