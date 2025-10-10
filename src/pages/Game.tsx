import { IonPage, IonContent, IonButton, IonAvatar, IonIcon, IonText, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol, IonHeader } from "@ionic/react";
import { arrowBackOutline, menu } from "ionicons/icons";
import { useHistory } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { shortenAddress } from "../utils/format";


const Game: React.FC = () => {
    const history = useHistory();

    const { address, disconnect, connect } = useAuth();
    const [username, setUsername] = useState(localStorage.getItem("username") || "Jugador");
    const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

    const walletAddress = address ? shortenAddress(address) : 'no conectado';

    return (
        <IonPage>
            <IonContent className="game">
                <div className="content-game">
                    <IonHeader>
                    <IonButton slot="start" className='backbutton' fill="clear" onClick={() => history.push('/tabs')}>
                        <IonIcon color="secondary" slot='' size={''} icon={arrowBackOutline} />
                    </IonButton>
                    <IonAvatar>
                        <img
                      src={profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="profile"
                    />
                    </IonAvatar>
                    <IonText>
                        {username || 'UserName'}
                        <p className="minitittle">{walletAddress}</p>
                    </IonText>
                    <IonButton slot="end" className='backbutton' fill="clear" >
                        <IonIcon color="secondary" slot='' size={''} icon={menu} />
                    </IonButton>
                    </IonHeader>

                    

                    <div className="bottom-space">
                        <IonCard className="user-panel">
                            <IonCardHeader>
                                <IonCardTitle className="subtitle">
                                    <div className="energy-bar">
                                        <div className="energy-fill" style={{ width: "56%" }}> </div>
                                    </div>
                                    <h5>ENERGY: 550/1800</h5>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol size="6">
                                            <IonButton color={'primary'}> básico </IonButton>
                                        </IonCol>
                                        <IonCol size="6">
                                            <IonButton color={'primary'}> cargado </IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol size="12">
                                            <IonButton color={'primary'}> especial </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard></div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Game;