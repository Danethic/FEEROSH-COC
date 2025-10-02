import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonText, IonGrid, IonCol, IonRow } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth, AuthProvider } from '../contexts/authcontext';
import { shortenAddress } from '../utils/format';

const Login: React.FC = () => {
    const history = useHistory();
    const { address, connect } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConnect = async () => {
        console.log('handleConnect start');
        setError(null);
        setLoading(true);
        try {
            await connect();
            console.log('connect() resolved, address:', address);
            history.replace('/tabs/tab1');
        } catch (e: any) {
            console.error('connect error', e);
            setError(e?.message || 'Error al conectar la wallet');
        } finally {
            setLoading(false);
        }
    };


    return (
        <IonPage>
            <IonContent className="ion-padding ">
                {address ? (
                    <>
                        <IonGrid className='center-content main'>
                            <IonRow>
                                <IonCol size='12'>
                                    <div className='t2'>
                                        <IonText class='subtittle addr'>Conectado: {shortenAddress(address)}</IonText>
                                        <IonButton className='bmain' color={'primary'} expand="block" onClick={() => history.replace('/tabs')}>
                                            Continuar
                                        </IonButton>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </>
                ) : (
                    <>
                        <div className='main center-content connect'>
                            <div className='t2 mainrow'>
                                <h2 className="title">Inicia sesión</h2>
                                <p className="subtitle">Conecta tu wallet para comenzar</p>
                                <IonButton className='bmain' expand="block" onClick={handleConnect} disabled={loading}>
                                    {loading ? 'Conectando...' : 'Conectar con MetaMask'}
                                </IonButton>
                                {error && <p className="error">{error}</p>} </div></div>
                    </>

                )}
            </IonContent>
        </IonPage>
    );
};

export default Login;