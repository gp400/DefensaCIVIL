import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const MedidasContent: React.FC = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [medida, setMedida] = useState<{id: string, titulo: string, descripcion: string, foto: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/medidas_preventivas.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/medidas_preventivas.php");
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
                <h1 className="ion-text-center">Medidas</h1>
                {
                    data?.datos.map((medidaItem: {id: string, titulo: string, descripcion: string, foto: string}) => {
                        return (
                            <IonItem key={medidaItem.id} onClick={() => {setIsOpen(true); setMedida(medidaItem)}}>
                                <IonThumbnail slot="start">
                                    <img alt={medidaItem.titulo} src={medidaItem.foto} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>{medidaItem.titulo}</h3>
                                    <p>{medidaItem.descripcion}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Medida</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{medida?.titulo}</h1>
                        <img className="ion-padding-horizontal" src={medida?.foto} alt={medida?.titulo} />
                    </div>
                    <p className="ion-padding">{medida?.descripcion}</p>
                </IonContent>
            </IonModal>
        </>
    )
}

export default MedidasContent
