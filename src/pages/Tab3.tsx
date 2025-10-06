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
  IonToast,
  IonAccordion,
  IonAccordionGroup,
  IonText,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { settingsOutline, lockClosedOutline, logOutOutline, notifications,informationCircleOutline, chatbox, eyeOff } from "ionicons/icons";
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
    } finally {
      setLoading(false);
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

// Estados locales
const [idioma, setIdioma] = useState(localStorage.getItem("idioma") || "Español");
const [moneda, setMoneda] = useState(localStorage.getItem("moneda") || "USD");
const [biometria, setBiometria] = useState(localStorage.getItem("biometria") === "true");
const [dosFA, setDosFA] = useState(localStorage.getItem("dosFA") === "true");

// Handlers
const handleIdiomaChange = (valor: string) => {
  setIdioma(valor);
  localStorage.setItem("idioma", valor);
};

const handleMonedaChange = (valor: string) => {
  setMoneda(valor);
  localStorage.setItem("moneda", valor);
};

const handleBiometriaChange = (checked: boolean) => {
  setBiometria(checked);
  localStorage.setItem("biometria", String(checked));
};

const handle2FAConfig = () => {
  const nuevoEstado = !dosFA;
  setDosFA(nuevoEstado);
  localStorage.setItem("dosFA", String(nuevoEstado));
  setToastMsg(
    nuevoEstado ? "2FA activado correctamente" : "2FA desactivado"
  );
  setShowToast(true);
};




  const walletAddress = address ? shortenAddress(address) : 'no conectado'; 
  return (
    <IonPage>
      <IonHeader translucent={true} collapse='fade'>
        {address ? (
          <>
            <IonToolbar >
              <IonButton slot='start' color={'background'} >
                <IonIcon size={''} icon={chatbox}></IonIcon>
              </IonButton>
              <IonTitle className=''>Profile</IonTitle>
              <IonButton slot='end' color={'background'}>
                <IonIcon size={''} icon={notifications}></IonIcon>
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
      <IonContent fullscreen className="tab2">
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

              <div className="t2 prof-segmets">
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
                    
                    {/* 🧩 Acordeón de ajustes */}
                    <IonAccordionGroup expand="inset" className="accordion">
                      {/* Preferencias */}
                      <IonAccordion value="preferencias">
                        <IonItem slot="header" color="none">
                          <IonIcon icon={settingsOutline} slot="start" />
                          <IonLabel>Preferencias</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                          <IonItem>
                            <IonLabel>Idioma</IonLabel>
                            <IonSelect
                            interface="popover"
                            slot="end"
                              value={idioma}
                              placeholder="Seleccionar"
                              onIonChange={(e) => handleIdiomaChange(e.detail.value)}
                            >
                              <IonSelectOption value="Español">Español</IonSelectOption>
                              <IonSelectOption value="Inglés">Inglés</IonSelectOption>
                              <IonSelectOption value="Portugués">Portugués</IonSelectOption>
                            </IonSelect>
                          </IonItem>

                          <IonItem>
                            <IonLabel slot="start">Moneda</IonLabel>
                            <IonSelect
                            slot="end"
                            interface="popover"
                              value={moneda}
                              placeholder="Seleccionar"
                              onIonChange={(e) => handleMonedaChange(e.detail.value)}
                            >
                              <IonSelectOption value="USD">USD</IonSelectOption>
                              <IonSelectOption value="EUR">EUR</IonSelectOption>
                              <IonSelectOption value="COP">COP</IonSelectOption>
                            </IonSelect>
                          </IonItem>
                        </div>
                      </IonAccordion>

                      {/* Seguridad */}
                      <IonAccordion value="seguridad">
                        <IonItem slot="header" color="none">
                          <IonIcon icon={lockClosedOutline} slot="start" />
                          <IonLabel>Seguridad</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                          <IonItem>
                            <IonLabel>Verificación biométrica</IonLabel>
                            <IonToggle
                            slot="end"
                              checked={biometria}
                              onIonChange={(e) => handleBiometriaChange(e.detail.checked)}
                            />
                          </IonItem>

                          <IonItem button onClick={handle2FAConfig}>
                            <IonLabel>Configurar 2FA</IonLabel>
                          </IonItem>
                        </div>
                      </IonAccordion>

                      {/* Otros */}
                      <IonAccordion value="otros">
                        <IonItem slot="header" color="none">
                          <IonIcon icon={informationCircleOutline} slot="start" />
                          <IonLabel>Otros</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                          <IonItem lines="none">
                            <IonLabel>Versión de la app</IonLabel>
                            <IonText slot="end">1.0.0</IonText>
                          </IonItem>
                          <IonItem lines="none">
                            <IonLabel>Soporte</IonLabel>
                            <IonText slot="end">support@feerosh.io</IonText>
                          </IonItem>
                        </div>
                      </IonAccordion>
                    </IonAccordionGroup>
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
                  {loading ? 'Conectando...' : 'Conectar'}
                </IonButton>
                {error && <p className="error">{error}</p>} </div></div>
          </>
        )}
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
