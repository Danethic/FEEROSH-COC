import React from 'react';
import { IonPage, IonContent, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Welcome: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonGrid className='center-content main '>
                    <IonRow className='t2 welcome'>
                        <IonCol size='12'>
                            <h2 className="title myscl">Bienvenido</h2>
                            <h4 className="subtitle">
                                Tu aventura empieza aquí.<p>Conecta tu wallet para empezar a jugar, gestionar items, competir y mucho más.
                                </p></h4>

                            <IonButton color='primary' className='bmain' onClick={() => history.push('/login')}>
                                <span>Comenzar <p className='minitittle'>(Conectar Wallet)</p></span>
                            </IonButton>
                            <IonButton fill={'outline'} color={'primary'} onClick={() => history.replace('/tabs')}>
                                Ingresa como invitado
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;

