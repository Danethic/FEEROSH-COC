import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import logo from '../../public/favicon.png'; // usa tu logo aquí

const Splash: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        const t = setTimeout(() => {
            history.replace('/welcome');
        }, 1800); // 1.8s -> ajusta si quieres más/menos
        return () => clearTimeout(t);
    }, [history]);

    return (
        <IonPage>
            <IonContent className="splash ion-padding center-content">
                <img src={logo} alt="logo" className="splash-logo" />
            </IonContent>
        </IonPage>
    );
};

export default Splash;
