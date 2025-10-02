import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonButton,
  IonList,
  IonItem,
  IonToggle,
  IonIcon,
  IonToast
} from "@ionic/react";
import { useState, useEffect } from "react";
import { createAnimation } from "@ionic/react";
import { useHistory } from "react-router";
import { settingsOutline, lockClosedOutline, logOutOutline, notifications, arrowBack, text, chatbox, help, chatbubble, barChart, chatboxEllipses, sad, mail, gitNetwork, eye, eyeOff } from "ionicons/icons";
import { useAuth } from "../contexts/authcontext";
import { shortenAddress } from "../utils/format";



const Tab3: React.FC = () => {
  const history = useHistory();
  const [tab, setTab] = useState<"nfts" | "ajustes">("nfts");
  const { address, disconnect, connect } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificaciones, setNotificaciones] = useState<boolean>(true);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("notificaciones");
    if (saved !== null) {
      setNotificaciones(saved === "true");
    }
  }, []);

  // guardar cada vez que cambie
  const handleToggleNotificaciones = (checked: boolean) => {
    setNotificaciones(checked);
    localStorage.setItem("notificaciones", String(checked));

    setToastMsg(checked ? "Notificaciones activadas" : "Notificaciones desactivadas");
    setShowToast(true);

    setToggleDisabled(true);
    setTimeout(() => setToggleDisabled(false), 1500);
  };

  const handleDisconnect = async () => {
    console.log('handleDisconnect start');
    setError(null);
    setLoading(true);
    try {
      await disconnect();
      console.log('disconnecting');
      history.replace('/tabs/tab1');
    } catch (e: any) {
      console.error('connect error', e);
      setError(e?.message || 'Error al desconetar');
    }
  };

  const handleConnect = async () => {
    console.log('handleConnect start');
    setError(null);
    setLoading(true);
    try {
      await connect();
      console.log('connect() resolved, address:', address);
      history.replace('/tabs/tab3');
    } catch (e: any) {
      console.error('connect error', e);
      setError(e?.message || 'Error al conectar la wallet');
    } finally {
      setLoading(false);
    }
  };



  const walletAddress = (shortenAddress(address || '')) ?? 'no conected'; // ⚡ luego traer de contexto/auth

  return (
    <IonPage>
      <IonHeader translucent={true} collapse='fade'>
        {address ? (
          <>
            <IonToolbar >
              <IonButton slot='start' color={'background'} >
                <IonIcon slot='' size={''} icon={chatbox}></IonIcon>
              </IonButton>
              <IonTitle className=''>Profile</IonTitle>
              <IonButton slot='end' color={'background'}>
                <IonIcon slot='' size={''} icon={notifications}></IonIcon>
              </IonButton>
            </IonToolbar>
          </>) : (
          <>
            <IonToolbar >
              <IonButton slot='start' color={'background'} >
                <IonIcon slot='' size={''} icon={chatbox}></IonIcon>
              </IonButton>
              <IonTitle className=''>Profile</IonTitle>
              <IonButton slot='end' disabled color={'background'}>
                <IonIcon slot='' size={''} icon={eyeOff}></IonIcon>
              </IonButton>
            </IonToolbar>
          </>
        )}

      </IonHeader>
      <IonContent className="tab2">
        {address ? (
          <>

            <div className="main k">
              {/* Sección usuario */}
              <div className="uSection">
                <IonAvatar>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="profile"
                  />
                </IonAvatar>
                <h2>Nombre Usuario</h2>
                <p>{walletAddress}</p>
                <IonButton size="small" fill="outline" color="primary">
                  Editar perfil
                </IonButton>
              </div>

              <div className="t2">
                {/* Tabs internas */}
                <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as any)}>
                  <IonSegmentButton value="nfts">
                    <IonLabel>NFTs</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="ajustes">
                    <IonLabel>Ajustes</IonLabel>
                  </IonSegmentButton>
                </IonSegment>

                {/* Contenido */}
                {tab === "nfts" && (
                  <IonGrid>
                    <IonRow>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <IonCol size="4" key={n}>
                          <img
                            src={`https://via.placeholder.com/150?text=NFT+${n}`}
                            alt={`NFT ${n}`}
                            style={{ borderRadius: "8px", width: "100%" }}
                          />
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                )}

                {tab === "ajustes" && (
                  <IonList lines="none">
                    <IonItem>
                      <IonIcon icon={notifications} slot="start" />
                      <IonLabel>Notificaciones</IonLabel>
                      <IonToggle slot="end"
                        checked={notificaciones}
                        disabled={toggleDisabled}
                        onIonChange={e => handleToggleNotificaciones(e.detail.checked)} />
                    </IonItem>
                    <IonItem button>
                      <IonIcon icon={settingsOutline} slot="start" />
                      <IonLabel>Preferencias</IonLabel>
                    </IonItem>
                    <IonItem button>
                      <IonIcon icon={lockClosedOutline} slot="start" />
                      <IonLabel>Privacidad</IonLabel>
                    </IonItem>
                    <IonItem button detail={true} color="none" onClick={handleDisconnect}>
                      <IonIcon icon={logOutOutline} slot="start" color="danger" />
                      <IonLabel color={"danger"}>Desconectar Wallet</IonLabel>
                    </IonItem>
                  </IonList>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='main k center-content connect'>
              <div className='t2 mainrow'>
                <h2 className="title">Inicia sesión</h2>
                <p className="subtitle">Conecta tu wallet para comenzar</p>
                <IonButton className='bmain' expand="block" onClick={handleConnect} disabled={loading}>
                  {loading ? 'Conectando...' : 'Conectar con MetaMask'}
                </IonButton>
                {error && <p className="error">{error}</p>} </div></div>
          </>
        )};
        <IonToast className="toast"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={3500}
          position="bottom"
        />

      </IonContent>
    </IonPage>
  );
};
export default Tab3;
