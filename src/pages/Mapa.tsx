import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MapaContent from '../components/MapaContent'

const Mapa: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Mapa de albergues</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <MapaContent/>
            </IonContent>
        </IonPage>
    )
}

export default Mapa
