import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const VideosContent: React.FC = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState<{id: string, fecha: string, titulo: string, descripcion: string, link: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/videos.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/videos.php");
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
                <h1 className="ion-text-center">Videos</h1>
                {
                    data?.datos.map((videoItem: {id: string, fecha: string, titulo: string, descripcion: string, link: string}) => {
                        return (
                            <IonItem key={videoItem.id} onClick={() => {setIsOpen(true); setVideo(videoItem)}}>
                                <IonLabel>
                                    <h3>{videoItem.titulo}</h3>
                                    <p>{videoItem.descripcion}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Video</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{video?.titulo}</h1>
                        <iframe width="90%" height="360" src={`https://www.youtube.com/embed/${video?.link}`} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="ion-padding">
                        <p><strong>Fecha: </strong>{video?.fecha}</p>
                        <p><strong>Descripcion:</strong> {video?.descripcion}</p>
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}

export default VideosContent;
