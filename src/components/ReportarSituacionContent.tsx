import { IonButton, IonInput, IonItem, IonLabel, IonTextarea, useIonAlert } from "@ionic/react";
import { useRef, useState } from "react";
import { Camera, CameraOptions } from '@ionic-native/camera'
import useFetch from "../hooks/useFetch";
import { useAppSelector } from "../reduxHooks";

interface ICamposValid {titulo: boolean | null, descripcion: boolean | null, foto: boolean | null, latitud: boolean | null, longitud: boolean | null}
interface ICamposParametros {titulo: string, descripcion: string, foto: string, latitud: string, longitud: string}

export const ReportarSituacionContent: React.FC = () => {

    const titulo = useRef<any>(null);
    const descripcion = useRef<any>(null);
    const latitud = useRef<any>(null);
    const longitud = useRef<any>(null);
    const [presentAlert] = useIonAlert();
    const { fetchApiPost } = useFetch();
    const { datos } = useAppSelector((state) => state.login)
    const [isValid, setIsValid] = useState<ICamposValid>({titulo: null, descripcion: null, foto: null, latitud: null, longitud: null});
    const [valores, setValores] = useState<ICamposParametros>({titulo: "", descripcion: "", foto: "", latitud: "", longitud: ""});

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

    const chooseImage = () => {

        let copia = {...isValid};
        copia.foto = true;
        setIsValid(copia);

        isValid.foto = true;

        const options: CameraOptions = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        }

        Camera.getPicture(options)
        .then((imageData: any) => {
            let copiaValores = {...valores};
            copiaValores.foto = 'data:image/jpeg;base64,' + imageData;
            setValores(copiaValores)
        })
    }

    const resetValores = () => {
        setValores({titulo: "", descripcion: "", foto: "", latitud: "", longitud: ""})
        setIsValid({titulo: null, descripcion: null, foto: null, latitud: null, longitud: null})
        titulo.current.value = "";
        descripcion.current.value = "";
        latitud.current.value = "";
        longitud.current.value = "";
    }

    const onSubmit = async() => {
        if (isValid.titulo && isValid.descripcion && isValid.latitud && isValid.longitud){
            if (!isValid.foto){
                presentAlert({
                    header: 'Alerta',
                    message: 'La imagen es requerida',
                    buttons: [
                        {
                            text: 'OK',
                            role: 'confirm',
                          }
                    ],
                });
            }
            let formData = new FormData();
            formData.set("titulo", valores.titulo);
            formData.set("descripcion", valores.descripcion);
            formData.set("foto", valores.foto);
            formData.set("latitud", valores.latitud);
            formData.set("longitud", (parseFloat(valores.longitud) * -1).toString());
            formData.set("token", datos.token);
            fetchApiPost('https://adamix.net/defensa_civil/def/nueva_situacion.php', formData)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.exito){
                    presentAlert({
                        header: 'Correcto',
                        message: 'Situacion agregada correctamente',
                        buttons: [
                            {
                                text: 'OK',
                                role: 'confirm',
                                handler: () => {
                                    resetValores();
                                },
                              }
                        ],
                    });
                } else {
                    presentAlert({
                        header: 'Error',
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
            if (!isValid.descripcion){
                copia.descripcion = false;
            }
            if (!isValid.foto){
                copia.foto = false;
            }
            if (!isValid.latitud){
                copia.latitud = false;
            }
            if (!isValid.longitud){
                copia.longitud = false;
            }
            if (!isValid.titulo){
                copia.titulo = false;
            }
            setIsValid(copia);
        }
    }

    return (
        <>
            <main className="container">
                <h1 className="ion-text-center">Reporte un caso</h1>
                <form className='ion-margin-top'>
                    <IonItem fill="solid" className={`${isValid.titulo && 'ion-valid'} ${isValid.titulo === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Titulo</IonLabel>
                        <IonInput ref={titulo} onIonInput={(event) => validate(event, "titulo")} onIonBlur={() => markTouched("titulo")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.descripcion && 'ion-valid'} ${isValid.descripcion === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Descripcion</IonLabel>
                        <IonTextarea ref={descripcion} onIonInput={(event) => validate(event, "descripcion")} onIonBlur={() => markTouched("descripcion")}></IonTextarea>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.latitud && 'ion-valid'} ${isValid.latitud === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Latitud</IonLabel>
                        <IonInput type="number" ref={latitud} onIonInput={(event) => validate(event, "latitud")} onIonBlur={() => markTouched("latitud")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.longitud && 'ion-valid'} ${isValid.longitud === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">longitud</IonLabel>
                        <IonInput type="number" ref={longitud} onIonInput={(event) => validate(event, "longitud")} onIonBlur={() => markTouched("longitud")}></IonInput>
                    </IonItem>
                    <div className="ion-margin-top">
                        <IonButton onClick={chooseImage}>Cargar Imagen</IonButton>
                    </div>
                    <div className="ion-margin-top">
                        <IonButton onClick={onSubmit}>Enviar</IonButton>
                    </div>
                </form>
            </main>
        </>
    )
}
