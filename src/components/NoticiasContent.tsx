import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail } from "@ionic/react";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAppSelector } from "../reduxHooks";

const NoticiasContent: React.FC = () => {

    const login = useAppSelector((state) => state.login);
    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [noticia, setNoticia] = useState<{id: string, fecha: string, titulo: string, contenido: string, foto: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/noticias.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/noticias.php");
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
            <h1 className="ion-text-center">Noticias</h1>
                {
                    data?.datos.map((notice: {id: string, fecha: string, titulo: string, contenido: string, foto: string}) => {
                        return (
                            <IonItem key={notice.id} onClick={() => {setIsOpen(true); setNoticia(notice)}}>
                                <IonThumbnail slot="start">
                                    <img alt={notice.titulo} src={notice.foto} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>{notice.titulo}</h3>
                                    <p>{notice.contenido}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Noticia</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{noticia?.titulo}</h1>
                        <img className="ion-padding-horizontal" src={noticia?.foto} alt={noticia?.titulo} />
                    </div>
                    <p className="ion-padding">{noticia?.contenido}</p>
                </IonContent>
            </IonModal>
        </>
    )
}

export default NoticiasContent
