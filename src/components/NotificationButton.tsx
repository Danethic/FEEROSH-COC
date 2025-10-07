import { IonButton, IonIcon, IonBadge } from "@ionic/react";
import { notifications } from "ionicons/icons";
import { useNotifications } from "../contexts/notificationscontext";

interface Props {
  onClick: () => void;
  slot?: string;
}

export const NotificationButton: React.FC<Props> = ({ onClick, slot }) => {
  const { unreadCount, pushEnabled } = useNotifications();

  return (
    <IonButton fill="clear" slot={slot} onClick={onClick}>
      <IonIcon
        icon={notifications}
        color={'secondary'}
      />
      {unreadCount > 0 && (
        <IonBadge
          color="danger"
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            borderRadius: "50%",
            width: "10px",
            height: "10px",
            padding: "0",
          }}
        />
      )}
    </IonButton>
  );
};
