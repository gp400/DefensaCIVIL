import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react'
import VideosContent from '../components/VideosContent';

const Videos: React.FC = () => {
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
              <IonMenuButton menu="nologged" />
              </IonButtons>
              <IonTitle>Videos</IonTitle>
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
              <VideosContent />
          </IonContent>
        </IonPage>
    )
}

export default Videos;
