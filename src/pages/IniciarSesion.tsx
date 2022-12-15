import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react"
import { useRef, useState } from "react";
import IniciarSesionContent from "../components/IniciarSesionContent"
import useFetch from "../hooks/useFetch";

interface ICamposValid {cedula: boolean | null, correo: boolean | null}
interface ICamposParametros {cedula: string, correo: string}

const IniciarSesion: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const cedula = useRef<any>(null);
    const correo = useRef<any>(null);
    const [presentAlert] = useIonAlert();
    const { fetchApiPost } = useFetch();
    const [isValid, setIsValid] = useState<ICamposValid>({cedula: null, correo: null});
    const [valores, setValores] = useState<ICamposParametros>({cedula: "", correo: ""});

    const validate = (ev: Event, campo: string) => {
        const value = (ev.target as HTMLInputElement).value ?? "";
        let copia = {...isValid};
        let copiaValores = {...valores};
        let parametros = valores[campo as keyof ICamposParametros];
        copia[campo as keyof ICamposValid] = !(parametros.trim() === "");
        copiaValores[campo as keyof ICamposParametros] = value.trim();
        setValores(copiaValores)
        setIsValid(copia);
    };

    const markTouched = (campo: string) => {
        let copia = {...isValid};
        copia[campo as keyof ICamposValid] = !(valores[campo as keyof ICamposParametros] === "");
        setIsValid(copia)
    };

    const recuperar = async() => {
        if (isValid.correo && isValid.cedula){
            let formData = new FormData();
            formData.set("correo", valores.correo);
            formData.set("cedula", valores.cedula);
            await fetchApiPost('https://adamix.net/defensa_civil/def/recuperar_clave.php', formData)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.exito === false){
                    presentAlert({
                        header: 'Alerta',
                        message: resp.mensaje,
                        buttons: [
                            {
                                text: 'OK',
                                role: 'confirm',
                              }
                        ],
                    });
                } else {
                    presentAlert({
                        header: 'Contraseña',
                        message: resp.mensaje,
                        buttons: [
                            {
                                text: 'OK',
                                role: 'confirm',
                              }
                        ],
                    });
                }
            });
        } else {
            let copia = {...isValid};
            if (!isValid.correo){
                copia.correo = false;
            }
            if (!isValid.cedula){
                copia.cedula = false;
            }
            setIsValid(copia);
        }
    }

    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton menu="nologged" />
                </IonButtons>
                <IonTitle>Iniciar Sesion</IonTitle>
                <IonButtons slot="primary">
                    <IonButton onClick={() => setIsOpen(true)}>Recuperar</IonButton>
                </IonButtons>
            </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IniciarSesionContent />
            </IonContent>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                    <IonTitle>Recuperar Contraseña</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsOpen(false)}>Cerrar</IonButton>
                    </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <h1 className="ion-text-center">Ingrese los datos</h1>
                    <form className='ion-margin-top'>
                        <IonItem fill="solid" className={`${isValid.cedula && 'ion-valid'} ${isValid.cedula === false && 'ion-invalid ion-touched'}`}>
                            <IonLabel position="floating">Cedula</IonLabel>
                            <IonInput ref={cedula} onIonInput={(event) => validate(event, "cedula")} onIonBlur={() => markTouched("cedula")}></IonInput>
                        </IonItem>
                        <IonItem fill="solid" className={`ion-margin-top ${isValid.correo && 'ion-valid'} ${isValid.correo === false && 'ion-invalid ion-touched'}`}>
                            <IonLabel position="floating">Correo</IonLabel>
                            <IonInput ref={correo} type='email' onIonInput={(event) => validate(event, "correo")} onIonBlur={() => markTouched("correo")}></IonInput>
                        </IonItem>
                        <div className='ion-margin-top'>
                            <IonButton onClick={recuperar}>Guardar</IonButton>
                        </div>
                    </form>
                </IonContent>
            </IonModal>
        </IonPage>
    )
}

export default IniciarSesion
