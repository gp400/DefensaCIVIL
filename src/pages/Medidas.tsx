import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MedidasContent from '../components/MedidasContent'

const Medidas: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Medidas preventivas</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <MedidasContent/>
            </IonContent>
        </IonPage>
    )
}

export default Medidas
