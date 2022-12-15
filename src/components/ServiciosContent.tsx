import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail } from "@ionic/react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch"

const ServiciosContent: React.FC = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [servicio, setServicio] = useState<{id: string, nombre: string, descripcion: string, foto: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/servicios.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/servicios.php");
        if (!isLoading){
            event.detail.complete();
        }
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <main className="container">
                <h1 className="ion-text-center">Servicios</h1>
                {
                    data?.datos.map((service: {id: string, nombre: string, descripcion: string, foto: string}) => {
                        return (
                            <IonItem key={service.id} onClick={() => {setIsOpen(true); setServicio(service)}}>
                                <IonThumbnail slot="start">
                                    <img alt={service.nombre} src={service.foto} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>{service.nombre}</h3>
                                    <p>{service.descripcion}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Servicio</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{servicio?.nombre}</h1>
                        <img className="ion-padding-horizontal" src={servicio?.foto} alt={servicio?.nombre} />
                    </div>
                    <p className="ion-padding">{servicio?.descripcion}</p>
                </IonContent>
            </IonModal>
        </>
    )
}

export default ServiciosContent
