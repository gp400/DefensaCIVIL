import { IonButton, IonInput, IonItem, IonLabel, useIonAlert } from '@ionic/react'
import { useRef, useState } from 'react';
import useFetch from '../hooks/useFetch';

interface ICamposValid {cedula: boolean | null, nombre: boolean | null, apellido: boolean | null, clave: boolean | null, correo: boolean | null, telefono: boolean | null}
interface ICamposParametros {cedula: string, nombre: string, apellido: string, clave: string, correo: string, telefono: string}

const VoluntarioContent: React.FC = () => {

    const cedula = useRef<any>(null);
    const nombre = useRef<any>(null);
    const apellido = useRef<any>(null);
    const clave = useRef<any>(null);
    const correo = useRef<any>(null);
    const telefono = useRef<any>(null);
    const [presentAlert] = useIonAlert();
    const { fetchApiPost } = useFetch();
    const [isValid, setIsValid] = useState<ICamposValid>({cedula: null, nombre: null, apellido: null, clave: null, correo: null, telefono: null});
    const [valores, setValores] = useState<ICamposParametros>({cedula: "", nombre: "", apellido: "", clave: "", correo: "", telefono: ""});

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

    const resetValores = () => {
        setValores({cedula: "", nombre: "", apellido: "", clave: "", correo: "", telefono: ""})
        setIsValid({cedula: null, nombre: null, apellido: null, clave: null, correo: null, telefono: null})
        cedula.current.value = "";
        nombre.current.value = "";
        apellido.current.value = "";
        clave.current.value = "";
        correo.current.value = "";
        telefono.current.value = "";
    }

    const onSubmit = async() => {
        if (isValid.apellido && isValid.cedula && isValid.clave && isValid.correo && isValid.nombre && isValid.telefono){
            let formData = new FormData();
            formData.set("cedula", valores.cedula);
            formData.set("nombre", valores.nombre);
            formData.set("apellido", valores.apellido);
            formData.set("clave", valores.clave);
            formData.set("correo", valores.correo);
            formData.set("telefono", valores.telefono);
            fetchApiPost('https://adamix.net/defensa_civil/def/registro.php', formData)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.exito){
                    presentAlert({
                        header: 'Correcto',
                        message: 'Voluntario agregado correctamente',
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
            if (!isValid.apellido){
                copia.apellido = false;
            }
            if (!isValid.cedula){
                copia.cedula = false;
            }
            if (!isValid.clave){
                copia.clave = false;
            }
            if (!isValid.correo){
                copia.correo = false;
            }
            if (!isValid.nombre){
                copia.nombre = false;
            }
            if (!isValid.telefono){
                copia.telefono = false;
            }
            setIsValid(copia);
        }
    }

    return (
        <>
            <main className="container">
                <h1 className="ion-text-center">Registrese</h1>
                <form className='ion-margin-top'>
                    <IonItem fill="solid" className={`${isValid.cedula && 'ion-valid'} ${isValid.cedula === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Cedula</IonLabel>
                        <IonInput ref={cedula} onIonInput={(event) => validate(event, "cedula")} onIonBlur={() => markTouched("cedula")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.nombre && 'ion-valid'} ${isValid.nombre === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Nombre</IonLabel>
                        <IonInput ref={nombre} onIonInput={(event) => validate(event, "nombre")} onIonBlur={() => markTouched("nombre")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.apellido && 'ion-valid'} ${isValid.apellido === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Apellido</IonLabel>
                        <IonInput ref={apellido} onIonInput={(event) => validate(event, "apellido")} onIonBlur={() => markTouched("apellido")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.clave && 'ion-valid'} ${isValid.clave === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Contraseña</IonLabel>
                        <IonInput ref={clave} type='password' onIonInput={(event) => validate(event, "clave")} onIonBlur={() => markTouched("clave")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.correo && 'ion-valid'} ${isValid.correo === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Correo</IonLabel>
                        <IonInput ref={correo} type='email' onIonInput={(event) => validate(event, "correo")} onIonBlur={() => markTouched("correo")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.telefono && 'ion-valid'} ${isValid.telefono === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Telefono</IonLabel>
                        <IonInput ref={telefono} type='tel' onIonInput={(event) => validate(event, "telefono")} onIonBlur={() => markTouched("telefono")}></IonInput>
                    </IonItem>
                    <div className='ion-margin-top'>
                        <IonButton onClick={onSubmit}>Guardar</IonButton>
                    </div>
                </form>
            </main>
        </>
    )
}

export default VoluntarioContent
