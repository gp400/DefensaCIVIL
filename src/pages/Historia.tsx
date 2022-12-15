import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import HistoriaContent from '../components/HistoriaContent'

const Historia: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Historia</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <HistoriaContent/>
            </IonContent>
        </IonPage>
    )
}

export default Historia
