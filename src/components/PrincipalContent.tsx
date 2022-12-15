import { IonSlide, IonSlides } from "@ionic/react"

const PrincipalContent: React.FC = () => {
    
    return (
        <main className="container ion-padding-top">
            <h1 className="ion-text-center">Acciones</h1>
            <IonSlides pager={true}>
                <IonSlide className="ion-padding-bottom">
                    <p>Da respuesta en la emergencia (incendios, derrames de sustancias peligrosas, inundaciones, estructuras colapsadas, etc.) en coordinación con los demás organismos
                        intervinientes para salvaguardar la vida y los bienes de la población y mitigar los posibles riesgos asociados al evento.</p>
                </IonSlide>
                <IonSlide>
                    <p>Crea planes de contingencia para la prevención y/o mitigación de desastres.</p>
                </IonSlide>
                <IonSlide>
                    <p>Establece políticas generales de Defensa Civil, en este sentido, en el ámbito de la Provincia.</p>
                </IonSlide>
                <IonSlide>
                    <p>Concreta convenios con la Nación y otras Provincias.</p>
                </IonSlide>
                <IonSlide>
                    <p>En caso de ser necesario, solicita al Poder Ejecutivo que declare el Estado de Emergencia de una parte o de todo el territorio de Mendoza.</p>
                </IonSlide>
                <IonSlide>
                    <p>Genera concientización en los ámbitos públicos y privados fijando objetivos y programas de difusión.</p>
                </IonSlide>
                <IonSlide>
                    <p>Establecer Planes de Contingencia y Programas de Defensa Civil.</p>
                </IonSlide>
                <IonSlide>
                    <p>Centralizar y dirigir las tareas de distribución de los medios de ayuda a los damnificados.</p>
                </IonSlide>
                <IonSlide>
                    <p>Promover la creación de servicios de Defensa Civil con capacidad para dar respuesta ante el peligro potencial previsto, fomentando la organización de Comités Zonales de DC.</p>
                </IonSlide>
                <IonSlide>
                    <p>Confeccionar Mapa de Riesgo, fijando Zonas de Riesgo según la naturaleza del peligro y la probable dispersión geográfica.</p>
                </IonSlide>
                <IonSlide >
                    <p>Orientar a la población sobre aspectos de la Defensa Civil; capacitando y difundiendo a través de los medios de comunicación masiva, las medidas necesarias para asegurar la autoprotección y la conciencia de solidaridad en momentos de catástrofes.</p>
                </IonSlide>
            </IonSlides>
        </main>
    )
}

export default PrincipalContent
