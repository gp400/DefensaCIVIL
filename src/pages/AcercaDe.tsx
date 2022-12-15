import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import AcercaDeContent from '../components/AcercaDeContent'

const AcercaDe: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Acerca De</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <AcercaDeContent/>
            </IonContent>
        </IonPage>
    )
}

export default AcercaDe
