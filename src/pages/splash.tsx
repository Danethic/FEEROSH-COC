import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import imagotipo from "../svgs/cocisotipo.svg"

const Splash: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        const t = setTimeout(() => {
            history.replace('/welcome');
        }, 3000); // 3s -> ajusta si quieres más/menos
        return () => clearTimeout(t);
    }, [history]);

    return (
        <IonPage>
            <IonContent className="splash">
                <div className='splash-logo-container'>
                    <img src={imagotipo} alt="logo" className="splash-logo" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Splash;
