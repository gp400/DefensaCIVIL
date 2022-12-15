import { IonRefresher, IonRefresherContent, RefresherEventDetail, useIonAlert, IonItem, IonThumbnail, IonLabel, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/react';
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { useAppSelector } from '../reduxHooks';

interface Situacion {id: string, voluntario: string, titulo: string, descripcion: string, foto: string, latitud: string, longitud: string, estado: string, fecha: string}

export const MisSituacionesContent: React.FC = () => {

    const {fetchApiPost} = useFetch();
    const [presentAlert] = useIonAlert();
    const [data, setData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [situacion, setSituacion] = useState<Situacion>();
    const { datos } = useAppSelector((state) => state.login)

    useEffect(() => {
        let formData = new FormData();
        formData.set("token", datos.token);
        fetchApiPost("https://adamix.net/defensa_civil/def/situaciones.php", formData)
        .then((response) => response.json())
        .then((resp) => {
            setData(resp.datos);
        })
        .catch(error => {
            presentAlert({
                header: 'Error',
                message: error.mensaje,
                buttons: [
                    {
                        text: 'OK',
                        role: 'confirm',
                      }
                ],
            });
        })
    }, []);
    
    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        let formData = new FormData();
        formData.set("token", datos.token);
        fetchApiPost("https://adamix.net/defensa_civil/def/situaciones.php", formData)
        .then((response) => response.json())
        .then((resp) => {
            setData(resp.datos);
            event.detail.complete();
        })
        .catch(error => {
            presentAlert({
                header: 'Error',
                message: error.mensaje,
                buttons: [
                    {
                        text: 'OK',
                        role: 'confirm',
                      }
                ],
            });
        })
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <main className="container">
                <h1 className="ion-text-center">Mis Situaciones</h1>
                {
                    data.map((situacion: Situacion) => {
                        return (
                            <IonItem key={situacion.id} onClick={() => {setIsOpen(true); setSituacion(situacion)}}>
                                <IonThumbnail slot="start">
                                    <img alt={situacion.titulo} src={situacion.foto} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>{situacion.titulo}</h3>
                                    <p>{situacion.descripcion}</p>
                                </IonLabel>
                            </IonItem>
                        )
                    })
                }
            </main>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Situacion</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="ion-text-center">
                        <h1 className="ion-padding-bottom">{situacion?.titulo}</h1>
                        <img className="ion-padding-horizontal" src={situacion?.foto} alt={situacion?.titulo} />
                    </div>
                    <div className='ion-padding'>
                        <p><strong>Codigo: </strong>{situacion?.id}</p>
                        <p><strong>Fecha: </strong>{situacion?.fecha}</p>
                        <p><strong>Descripcion: </strong>{situacion?.descripcion}</p>
                        <p><strong>Estado: </strong>{situacion?.estado}</p>
                    </div>
                </IonContent>
            </IonModal>
        </>
    )
}
