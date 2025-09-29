import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { navigate } from 'ionicons/icons';

const Welcome: React.FC = () => {
    const history = useHistory();
    return (
        <IonPage>
            <IonContent className="ion-padding ">
                <div className='center-content main'>
                    <div className='t2 '>
                        <h2 className="title myscl">Bienvenido</h2>
                        <h4 className="subtitle">
                            Tu aventura empieza aquí.<p>Conecta tu wallet para empezar a jugar, gestionar items, competir y mucho más.
                            </p></h4>
                    </div>
                    <IonButton color='primary' className='bmain' onClick={() => history.push('/login')}>
                        <span>Comenzar <p className='minitittle'>(Conectar Wallet)</p></span>
                    </IonButton>
                    <IonButton fill={'outline'} color={'primary'} onClick={() => history.replace('/tabs')}>
                        Ingresa como invitado
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;

