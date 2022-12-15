import { IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import useFetch from '../hooks/useFetch';

const MapaContent: React.FC = () => {

    const {data, isLoading, fetchApi} = useFetch();
    const [isOpen, setIsOpen] = useState(false);
    const [noticia, setNoticia] = useState<{id: string, fecha: string, titulo: string, contenido: string, foto: string}>();

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
                <MapContainer style={{height: "85vh" }} className="ion-margin-top" center={[19.017558, -70.292495]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='Gabriel'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        data?.datos.map((albergueItem: {ciudad: string, codigo: string, edificio: string, coordinador: string, telefono: string, capacidad: string, lat: string, lng: string}, index: any) => {
                            return (

                                    <Marker key={index} position={[parseFloat(albergueItem.lng), parseFloat(albergueItem.lat)]}>
                                        <Popup>
                                            <p><strong>Ciudad: </strong>{albergueItem?.ciudad}</p>
                                            <p><strong>Codigo: </strong>{albergueItem?.codigo}</p>
                                            <p><strong>Edificio: </strong>{albergueItem?.edificio}</p>
                                            <p><strong>Coordinador: </strong>{albergueItem?.coordinador}</p>
                                            <p><strong>Telefono: </strong>{albergueItem?.telefono}</p>
                                            <p><strong>Capacidad: </strong>{albergueItem?.capacidad}</p>
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

export default MapaContent
