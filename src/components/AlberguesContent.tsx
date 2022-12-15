import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const AlberguesContent = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [albergue, setAlbergue] = useState<{ciudad: string, codigo: string, edificio: string, coordinador: string, telefono: string, capacidad: string, lat: string, lng: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/albergues.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/albergues.php");
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
                <h1 className="ion-text-center">Albergues</h1>
                {
                    data?.datos.map((albergueItem: {ciudad: string, codigo: string, edificio: string, coordinador: string, telefono: string, capacidad: string, lat: string, lng: string}, index: any) => {
                        return (
                            <IonItem key={index} onClick={() => {setIsOpen(true); setAlbergue(albergueItem)}}>
                                <IonLabel>
                                    <h3>{albergueItem.edificio}</h3>
                                    <p>{albergueItem.coordinador}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Albergue</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1>{albergue?.edificio}</h1>
                    </div>
                    <div className="ion-padding">
                        <p><strong>Ciudad: </strong>{albergue?.ciudad}</p>
                        <p><strong>Codigo: </strong>{albergue?.codigo}</p>
                        <p><strong>Coordinador: </strong>{albergue?.coordinador}</p>
                        <p><strong>Telefono: </strong>{albergue?.telefono}</p>
                        <p><strong>Capacidad: </strong>{albergue?.capacidad}</p>
                        <p><strong>Latitud: </strong>{albergue?.lng}</p>
                        <p><strong>Longitud: </strong>{albergue?.lat}</p>
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}

export default AlberguesContent
