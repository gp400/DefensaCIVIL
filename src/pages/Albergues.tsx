import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'
import AlberguesContent from '../components/AlberguesContent';

const Albergues: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
              <IonMenuButton menu="nologged" />
              </IonButtons>
              <IonTitle>Albergues</IonTitle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
              <AlberguesContent />
          </IonContent>
        </IonPage>
    )
}

export default Albergues;
