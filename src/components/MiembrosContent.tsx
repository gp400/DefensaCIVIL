import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonRefresher, IonRefresherContent, IonThumbnail, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';

const MiembrosContent: React.FC = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [miembro, setMiembro] = useState<{id: string, nombre: string, cargo: string, foto: string}>();

    useEffect(() => {
        fetchApi("https://adamix.net/defensa_civil/def/miembros.php");
    }, []);

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchApi("https://adamix.net/defensa_civil/def/miembros.php");
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
                <h1 className="ion-text-center">Miemrbros</h1>
                {
                    data?.datos.map((miembroItem: {id: string, nombre: string, cargo: string, foto: string}) => {
                        return (
                            <IonItem key={miembroItem.id} onClick={() => {setIsOpen(true); setMiembro(miembroItem)}}>
                                <IonThumbnail slot="start">
                                    <img alt={miembroItem.nombre} src={miembroItem.foto} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>{miembroItem.nombre}</h3>
                                    <p>{miembroItem.cargo}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Miembro</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{miembro?.nombre}</h1>
                        <img className="ion-padding-horizontal" src={miembro?.foto} alt={miembro?.nombre} />
                    </div>
                    <p className="ion-padding"><strong>Cargo:</strong> {miembro?.cargo}</p>
                </IonContent>
            </IonModal>
        </>
    )
}

export default MiembrosContent
