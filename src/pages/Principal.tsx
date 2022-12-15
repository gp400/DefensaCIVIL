import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import PrincipalContent from '../components/PrincipalContent';

const Principal: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
            <IonMenuButton menu="nologged" />
            </IonButtons>
            <IonTitle>Pagina Principal</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
            <PrincipalContent/>
        </IonContent>
      </IonPage>
    );
}

export default Principal
