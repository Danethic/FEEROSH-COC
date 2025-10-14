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
  IonIcon,
  createAnimation
} from "@ionic/react";
import { useNotifications } from "../contexts/notificationscontext";
import { close, eyeOff } from "ionicons/icons";

import './NotificationPanel.css'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markAllAsRead } = useNotifications();

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'translateX(100%)' },
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
      id="notifications-modal"
      isOpen={isOpen}
      onDidDismiss={onClose}
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
      backdropDismiss={false}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notificaciones</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            onClick={onClose}
            color="danger"
          >
            <IonIcon size="" slot="" icon={close}></IonIcon>
          </IonButton>

          <IonButton
            slot="start"
            fill="clear"
            onClick={markAllAsRead}
            color="background"
          >
            <IonIcon size="" slot="" icon={eyeOff}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="notification-panel-content">
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
