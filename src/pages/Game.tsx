import { IonPage, IonContent, IonButton, IonIcon, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router";

const Game: React.FC = () => {

    const history = useHistory();

    return (
        <IonPage>
            <IonContent fullscreen className="game">
                <div className="content-game">
                    <IonButton className='backbutton' fill="clear" onClick={() => history.push('/tabs')}>
                        <IonIcon color="secondary" slot='' size={''} icon={arrowBackOutline} />
                    </IonButton>

                    <IonCard className="user-panel">
                        <IonCardHeader>
                            <IonCardTitle className="subtitle">
                                <div className="energy-bar">
                                    <div className="energy-fill" style={{ width: "23%" }}> </div>
                                </div>
                                <h5>ENERGY: 550/1800</h5>
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6">
                                        <IonButton color={'primary'}> arañazo </IonButton>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonButton color={'primary'}> zarpazo </IonButton>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12">
                                        <IonButton color={'primary'}> Ataque Especial </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Game;