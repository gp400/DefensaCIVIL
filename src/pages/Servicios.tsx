import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import ServiciosContent from "../components/ServiciosContent"

const Servicios: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Servicios</IonTitle>
            </IonToolbar>
            </IonHeader>
    
            <IonContent fullscreen>
                <ServiciosContent/>
            </IonContent>
        </IonPage>
    )
}

export default Servicios
