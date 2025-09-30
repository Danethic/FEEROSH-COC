import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonSearchbar, IonText } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router';
import { warning, star, arrowForwardOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';

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
      }}
    />
  );

  return (
    <IonPage>

      <IonHeader translucent={true} collapse='fade'>
        <IonToolbar >
          <IonTitle className=''>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className='main k'>
          <IonGrid>
            <IonRow className='ion-align-content-center ion-justify-content-center'>
              <IonCol size='12' sizeMd='6' class='col1'>
                <h2 className='temptittle t2' > {temporadaEnCurso ? "Online" : "Offline"} <span style={{ alignItems: "center", gap: "8px" }}>
                  <EstadoIcono color={temporadaEnCurso ? "green" : "red"} />
                </span></h2>
                <div className='left-align'>
                  <div>
                    <IonText className='subtittle '> Premio por jugador</IonText>
                    <h3 className='tittle'>$150,00</h3></div>
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

            <IonRow className='ion-justify-content-evenly'>
              <IonCol size='6' sizeMd='4' className='col2'>
                <IonCard className='t2'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                </IonCard>
              </IonCol>
              <IonCol size='6' pushMd='4' sizeMd='4' className='col2'>
                <IonCard className='t2'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
                </IonCard>
              </IonCol>
              <IonCol size='12' pullMd='4' sizeMd='4' className='col2'>
                <IonCard className='t3'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam, dolor illum similique quis quisquam non accusamus dicta debitis quo? Soluta ad dicta nihil quos possimus quaerat dignissimos, exercitationem repellendus!</h2>
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
