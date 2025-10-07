import { IonContent, IonHeader, IonPage, IonList, IonItem, IonLabel, IonSearchbar, IonTitle, IonToolbar, IonIcon, IonCard, IonButton, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { notifications, arrowForwardOutline, flash, flame, barChart, searchOutline, arrowUp, arrowDown } from 'ionicons/icons';
import { useState } from 'react';
import { useGame } from '../contexts/gamecontext';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useTabVisibilityAnimation } from '../hooks/useEnterAnimation';
import { shortenAddress } from '../utils/format';

import guepardo from '../svgs/guepardo.svg'
import oso from '../svgs/oso.svg'
import { NotificationButton } from '../components/NotificationButton';
import { NotificationsPanel } from '../components/NotificationPanel';
import { useNotifications } from '../contexts/notificationscontext';


const Tab1: React.FC = () => {
  const history = useHistory();

  const [temporadaEnCurso, setTemporadaEnCurso] = useState<boolean>(false);

  const anim = useTabVisibilityAnimation('up');

  const { jugadores, acciones, fetchJugadores, fetchAcciones } = useGame()
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"energia" | "ataques">("energia");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSortClick = (key: "energia" | "ataques") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      console.log('sortOrder:', sortOrder);
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // Filtro + orden
  const jugadoresFiltradosOrdenados = jugadores
    .filter(
      (j) =>
        j.username.toLowerCase().includes(search.toLowerCase()) ||
        j.address.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = sortKey === "energia" ? a.energia : a.ataques;
      const valueB = sortKey === "energia" ? b.energia : b.ataques;
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });


  const EstadoIcono: React.FC<{ color: string }> = ({ color }) => (
    <span
      style={{
        display: "inline-block",
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: color,
        alignSelf: "center",
        marginLeft: '5px'
      }}
    />
  );

  return (
    <IonPage>

      <IonHeader translucent={true} collapse='fade'>
        <IonToolbar >
          <IonButton slot='start' color={'background'} >
            <IonIcon slot='' size={''} icon={barChart}></IonIcon>
          </IonButton>
          <IonTitle className=''>Home</IonTitle>
          <NotificationButton slot="end" onClick={() => setShowNotifPanel(true)} />
          </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='base'>
          <div className='main k'>
            <IonGrid>
              <IonRow className='ion-align-content-center ion-justify-content-center'>
                <IonCol size='12' class='col1'>
                  <div className='t2 tmpcont'>
                    <h2 className='temptittle' >Season state: </h2>
                    <h2 className='temptittle'> {temporadaEnCurso ? "Online" : "Offline"}
                      <EstadoIcono color={temporadaEnCurso ? "green" : "red"} /></h2>
                  </div>
                  <div className=''>
                    <div className='prize'>
                      <IonText className='subtittle '> Premio por jugador</IonText>
                      <h3 className='tittle'>$150,00</h3>
                    </div>
                    <IonButton className='bmain'>
                      let's Play
                    </IonButton>
                  </div>
                  <div className='t3 ann'>
                    <span>Tu tambien puedes ganar, averigua como!</span>
                    <IonButton size='small'>
                      <IonIcon slot='' icon={arrowForwardOutline}></IonIcon>
                    </IonButton>
                  </div>
                </IonCol>
              </IonRow>

              <IonRow className='ion-align-content-center ion-justify-content-center  row2'>
                <IonCol size='6' className='col2 token-summary'>
                  <IonCard className='t2'>
                    <div className="token-data left-align">
                      <p className='tname'>$FEER</p>
                      <h3>$0.000</h3>
                      <p className='minitittle'>Cambio 1h: +0.00%</p>
                      <p className='minitittle'>Volumen: $0</p>
                      <p className='minitittle'>Market Cap: $0</p>
                    </div>
                  </IonCard>
                </IonCol>
                <IonCol size='6' className='col2 pet-box'>
                  <IonCard className='t2'>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                  </IonCard>
                </IonCol>
                <IonCol size='12' className='col2'>
                  <IonCard className='Info-carrousel t3'>
                    <Swiper modules={[Pagination, Autoplay]} autoplay={true} speed={500}>
                      <SwiperSlide><div className="ad">🔥 Nuevo torneo esta semana</div></SwiperSlide>
                      <SwiperSlide><div className="ad">💰 Recompensas duplicadas</div></SwiperSlide>
                      <SwiperSlide><div className="ad">🐾 Cuida tu mascota para ganar</div></SwiperSlide>
                    </Swiper>
                  </IonCard>
                </IonCol>
              </IonRow>

              <IonRow className='ion-justify-content-evenly'>
                <IonCol size='12' className='col3'>
                  <IonCard className='t2 action-feed'>
                    <h2 >Acciones recientes</h2>
                    <IonList>
                      {acciones.map((a, idx) => (
                        <IonItem
                          key={idx}
                          color='none'
                          lines="none"
                          style={{
                            backgroundColor:
                              a.tipo === "juego" ? "color-mix(in srgb, var(--ion-color-danger) 50%, transparent" : "color-mix(in srgb, var(--ion-color-warning) 50%, transparent",
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
                  </IonCard>
                </IonCol>
                <IonCol size='12' className='col3'>
                  <IonCard className='t2 Ranking-feed'>
                    <IonToolbar>
                      <IonTitle>Ranking de jugadores</IonTitle>
                      <IonButton slot='end'
                        onClick={() => setShowSearch(!showSearch)}
                      >
                        <IonIcon icon={searchOutline} />
                      </IonButton>
                    </IonToolbar>

                    {/* 🔹 Buscador desplegable */}
                    {showSearch && (
                      <IonSearchbar
                        className='custom'
                        value={search}
                        onIonInput={(e) => setSearch(e.detail.value!)}
                        placeholder="Buscar por nombre o dirección"
                        debounce={300}
                        color={'secondary'}
                      />
                    )}

                    {/* 🔹 Tabla de jugadores */}
                    <IonGrid className="ranking-table">
                      {/* Encabezado de columnas */}
                      <IonRow className='RR1' >
                        <IonCol size="4">
                          Jugador
                        </IonCol>

                        <IonCol
                          size="3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSortClick("energia")}
                        >
                          <div>
                            Energía
                            {sortKey === "energia" && (
                              <IonIcon
                                icon={
                                  sortOrder === "asc" ? arrowUp : arrowDown}
                                color="secondary"
                                size=''
                              />
                            )}
                          </div>
                        </IonCol>

                        <IonCol
                          size="3"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSortClick("ataques")}
                        >
                          <div>
                            Ataques
                            {sortKey === "ataques" && (
                              <IonIcon
                                icon={
                                  sortOrder === "asc" ? arrowUp : arrowDown}
                                color="secondary"
                                size=''
                              />
                            )}</div>
                        </IonCol>

                        <IonCol size="2">
                          <div>
                            Equipo
                          </div>
                        </IonCol>
                      </IonRow>

                      {/* Filas de jugadores */}
                      {jugadoresFiltradosOrdenados.map((j, idx) => (
                        <IonRow
                          key={idx}
                          style={{
                            alignItems: "center",
                            fontSize: "0.8rem",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            color: "#ffd690",
                          }}
                        >
                          <IonCol size="4">
                            <div style={{ textAlign: "left" }}>
                              <strong>{j.username}</strong>
                              <p style={{ fontSize: "0.65rem", margin: 0, opacity: 0.8 }}>
                                {shortenAddress(j.address)}
                              </p>
                            </div>
                          </IonCol>
                          <IonCol size="3">{j.energia}</IonCol>
                          <IonCol size="3">{j.ataques}</IonCol>
                          <IonCol size="2">
                            <img
                              src={j.equipo === "guepardo" ? guepardo : oso}
                              alt={j.equipo}
                              style={{ width: "24px", height: "24px" }}
                            />
                          </IonCol>
                        </IonRow>
                      ))}
                    </IonGrid>
                  </IonCard>
                </IonCol>
              </IonRow>



            </IonGrid>
          </div>
        </div>

        <NotificationsPanel
  isOpen={showNotifPanel}
  onClose={() => setShowNotifPanel(false)}
/>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;