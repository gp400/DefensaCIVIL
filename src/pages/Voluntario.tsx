import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import VoluntarioContent from "../components/VoluntarioContent"

const Voluntario: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Voluntario</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <VoluntarioContent/>
            </IonContent>
        </IonPage>
    )
}

export default Voluntario
