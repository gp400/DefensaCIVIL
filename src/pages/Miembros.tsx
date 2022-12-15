import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MiembrosContent from '../components/MiembrosContent'

const Miembros: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Miembros</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <MiembrosContent/>
            </IonContent>
        </IonPage>
    )
}

export default Miembros
