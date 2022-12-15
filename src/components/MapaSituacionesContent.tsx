import { IonRefresher, IonRefresherContent, RefresherEventDetail, useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useFetch from "../hooks/useFetch";
import { useAppSelector } from "../reduxHooks";

interface Situacion {id: string, voluntario: string, titulo: string, descripcion: string, foto: string, latitud: string, longitud: string, estado: string, fecha: string}

export const MapaSituacionesContent: React.FC = () => {

    const {fetchApiPost} = useFetch();
    const [presentAlert] = useIonAlert();
    const [data, setData] = useState<any>([]);
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
                <MapContainer style={{height: "85vh" }} className="ion-margin-top" center={[19.017558, -70.292495]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='Gabriel'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        data.map((situacion: Situacion, index: any) => {
                            return (

                                    <Marker key={index} position={[parseFloat(situacion.latitud), parseFloat(situacion.longitud)]}>
                                        <Popup>
                                            <p><strong>Titulo: </strong>{situacion.titulo}</p>
                                            <p><strong>Descripcion: </strong>{situacion.descripcion}</p>
                                            <p><strong>Estado: </strong>{situacion.estado}</p>
                                        </Popup>
                                    </Marker>
                            )
                        })
                    }
                </MapContainer>
            </main>
        </>
    )
}
