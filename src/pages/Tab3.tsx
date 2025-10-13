import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
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
  IonSelectOption,
  IonModal,
  IonInput
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { settingsOutline, lockClosedOutline, logOutOutline, cameraOutline, imageOutline, notifications, informationCircleOutline, eyeOff, barChart } from "ionicons/icons";
import { useAuth } from "../contexts/authcontext";
import { shortenAddress } from "../utils/format";
import { NotificationButton } from "../components/NotificationButton";
import { NotificationsPanel } from "../components/NotificationPanel";
import { useNotifications } from "../contexts/notificationscontext";



const Tab3: React.FC = () => {
  const history = useHistory();
  const { address, disconnect, connect } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  const { pushEnabled, setPushEnabled } = useNotifications();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);


  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");


  // guardar cada vez que cambie
  const handleToggleNotificaciones = (checked: boolean) => {
    setPushEnabled(checked);
    localStorage.setItem("pushEnabled", String(checked));
    setToastMsg(
      checked
        ? "Notificaciones activadas"
        : "Notificaciones desactivadas"
    );
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


  const [username, setUsername] = useState(localStorage.getItem("username") || "Jugador");
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [showNFTPicker, setShowNFTPicker] = useState(false);
  const mockNFTs = [
    { id: 1, name: "Fiera Alfa", image: "/assets/nfts/fiera1.png" },
    { id: 2, name: "Sombra Beta", image: "/assets/nfts/sombra1.png" },
    { id: 3, name: "Fiera Dorada", image: "/assets/nfts/fiera2.png" },
  ];

  const handleProfileImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setProfileImage(result);
        localStorage.setItem("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNFTSelect = (nft: any) => {
    setProfileImage(nft.image);
    localStorage.setItem("profileImage", nft.image);
    setShowNFTPicker(false);
  };

  const handleSaveProfile = () => {
    localStorage.setItem("username", username);
    setShowEditModal(false);
  };



  const walletAddress = address ? shortenAddress(address) : 'no conectado';
  return (
    <IonPage>
      <IonHeader>
        {address ? (
          <>
            <IonToolbar >
              <IonButton slot='start' color={'background'} >
                <IonIcon size={''} icon={barChart}></IonIcon>
              </IonButton>
              <IonTitle className=''>Profile</IonTitle>
              <NotificationButton slot="end" onClick={() => setShowNotifPanel(true)} />
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
        <div className="base">
          {address ? (
            <>

              <div className="main k">
                {/* Sección usuario */}
                <div className="uSection">
                  <IonAvatar>
                    <img
                      src={profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="profile"
                    />
                  </IonAvatar>
                  <h2>{username || 'UserName'}</h2>
                  <p>{walletAddress}</p>
                  <IonButton size="small" fill="outline" color="primary" onClick={() => setShowEditModal(true)}>
                    Editar perfil
                  </IonButton>
                </div>

                <div className="t2 prof-segmets">
                  <IonSegment mode="ios" value={'nfts'}>
                    <IonSegmentButton value="nfts" contentId="nfts">
                      <IonLabel>NFTs</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="ajustes" contentId="ajustes">
                      <IonLabel>Ajustes</IonLabel>
                    </IonSegmentButton>
                  </IonSegment>

                  <IonSegmentView>
                    <IonSegmentContent className="segment-container" id="nfts">
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
                    </IonSegmentContent>


                    <IonSegmentContent className="segment-container" id="ajustes">
                      <IonList lines="none">
                        <IonItem>
                          <IonIcon icon={notifications} slot="start" />
                          <IonLabel>Notificaciones</IonLabel>
                          <IonToggle slot="end"
                            checked={pushEnabled}
                            disabled={toggleDisabled}
                            onIonChange={(e) => { handleToggleNotificaciones(e.detail.checked) }} />
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

                        <IonItem className="logout-item" button detail={true} color="none" onClick={handleDisconnect}>
                          <IonIcon icon={logOutOutline} slot="start" color="danger" />
                          <IonLabel color={'danger'}>Desconectar Wallet</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonSegmentContent>
                  </IonSegmentView>
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
        </div>
        <IonToast className="toast"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={3500}
          position="bottom"
        />
        <IonModal id="profile-modal" isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar perfil</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="auto">
                  <IonAvatar style={{ width: "100px", height: "100px", margin: "0 auto" }}>
                    <img
                      src={profileImage || "/assets/default-avatar.png"}
                      alt="Foto de perfil"
                      style={{ objectFit: "cover" }}
                    />
                  </IonAvatar>
                </IonCol>
              </IonRow>

              <IonRow className="ion-justify-content-center t2 ion-text-center">
                <IonButton className="b-special"
                  fill="clear"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <IonIcon icon={cameraOutline} slot="start" />
                  Subir
                </IonButton>

                <IonButton className="b-special" fill="clear" size="small" onClick={() => setShowNFTPicker(true)}>
                  <IonIcon icon={imageOutline} slot="start" />
                  Usar NFT
                </IonButton>

                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageUpload}
                />
              </IonRow>

              <IonItem lines="none">
                <IonLabel position="stacked">Nombre de usuario
                </IonLabel>
                <IonInput
                  value={username}
                  maxlength={15}
                  onIonChange={(e) => {
                    const value = e.detail.value || "";
                    if (value.length <= 12) setUsername(value);
                  }}
                  placeholder="Tu nombre de usuario"
                />

              </IonItem>

              <IonRow className="ion-justify-content-center ion-margin-top">
                <IonButton className="bmain" onClick={handleSaveProfile}>
                  Guardar
                </IonButton>
                <IonButton fill="outline" color="tertirary" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </IonButton>
              </IonRow>
            </IonGrid>

            {/* Modal secundario para elegir NFT */}
            <IonModal id="nft-modal" isOpen={showNFTPicker} onDidDismiss={() => setShowNFTPicker(false)}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Seleccionar NFT</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonGrid>
                  <IonRow>
                    {mockNFTs.map((nft) => (
                      <IonCol
                        size="6"
                        key={nft.id}
                        onClick={() => handleNFTSelect(nft)}
                        style={{
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={nft.image}
                          alt={nft.name}
                          style={{
                            borderRadius: "12px",
                            width: "100%",
                            border: "2px solid #ffd690",
                          }}
                        />
                        <IonLabel>{nft.name}</IonLabel>
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </IonContent>
            </IonModal>
          </IonContent>
        </IonModal>

        <NotificationsPanel
          isOpen={showNotifPanel}
          onClose={() => setShowNotifPanel(false)}
        />



      </IonContent>
    </IonPage>
  );
};
export default Tab3;
