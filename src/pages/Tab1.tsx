import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonButton, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { useHistory } from 'react-router';
import { notifications, arrowForwardOutline, barChart } from 'ionicons/icons';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';


const Tab1: React.FC = () => {
  const history = useHistory();

  const [temporadaEnCurso, setTemporadaEnCurso] = useState<boolean>(false);

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
          <IonButton slot='end' color={'background'}>
            <IonIcon slot='' size={''} icon={notifications}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='main k'>
          <IonGrid>
            <IonRow className='ion-align-content-center ion-justify-content-center'>
              <IonCol size='12' sizeMd='6' class='col1'>
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
              <IonCol size='6' sizeMd='3' className='col2 token-summary'>
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
              <IonCol size='6' sizeMd='3' className='col2 pet-box'>
                <IonCard className='t2'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                </IonCard>
              </IonCol>
              <IonCol size='12' sizeMd='6' className='col2'>
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
              <IonCol size='12' sizeMd='6' className='col3'>
                <IonCard className='t2'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                </IonCard>
              </IonCol>
              <IonCol size='12' sizeMd='6' className='col3'>
                <IonCard className='t2'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                </IonCard>
              </IonCol>
            </IonRow>



          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;