import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router';
import { warning } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader translucent={true} collapse='fade'>
        <IonToolbar >
          <IonTitle className=''>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='dash center-content'>
          <div className='t2 pnl'>
            <h2 >Bienvenido a la dApp 🚀</h2>
            <IonButton expand="block" onClick={() => history.push('/profile')}>
              Ir a Perfil
            </IonButton></div>
          <div className='t2 pnl'>
            <h2 >Bienvenido a la dApp 🚀</h2>
            <IonButton expand="block" onClick={() => history.push('/profile')}>
              Ir a Perfil
            </IonButton></div>
          <div className='t2 pnlf' id='game-announce'>
            <h2 >Temporada en curso</h2>
            <div className='t3'>
              <span>Premio: $150 por jugador</span>
            </div>
            <div className='inline'>
              <IonButton color={'success'} expand="block" onClick={() => history.push('/game')}>
                entrar
              </IonButton>
              <IonButton color={'secondary'} expand="block" onClick={() => history.push('/game')}>
                seguir
              </IonButton>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
