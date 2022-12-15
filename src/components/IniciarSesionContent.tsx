import { IonButton, IonInput, IonItem, IonLabel, useIonAlert } from '@ionic/react';
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router';
import useFetch from '../hooks/useFetch';
import { setState } from '../redux/loginSlice';
import { useAppDispatch } from '../reduxHooks';

interface ICamposValid {cedula: boolean | null, clave: boolean | null}
interface ICamposParametros {cedula: string, clave: string}

const IniciarSesionContent: React.FC = () => {

    const dispatch = useAppDispatch()
    const cedula = useRef<any>(null);
    const clave = useRef<any>(null);
    const { fetchApiPost } = useFetch();
    const [presentAlert] = useIonAlert();
    const history = useHistory();
    const [isValid, setIsValid] = useState<ICamposValid>({cedula: null, clave: null});
    const [valores, setValores] = useState<ICamposParametros>({cedula: "", clave: ""});

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

    const login = async()=>{
        if (isValid.clave && isValid.cedula){
            let formData = new FormData();
            formData.set("clave", valores.clave);
            formData.set("cedula", valores.cedula);
            await fetchApiPost('https://adamix.net/defensa_civil/def/iniciar_sesion.php', formData)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.exito === false){
                    presentAlert({
                        header: 'Alerta',
                        message: 'Ingrese las credenciales correctas',
                        buttons: [
                            {
                                text: 'OK',
                                role: 'confirm',
                              }
                        ],
                    });
                } else {
                    setValores({cedula: "", clave: ""});
                    dispatch(setState(resp))
                    history.replace("/user/noticias")
                }
            });
        } else {
            let copia = {...isValid};
            if (!isValid.clave){
                copia.clave = false;
            }
            if (!isValid.cedula){
                copia.cedula = false;
            }
            setIsValid(copia);
        }
    }

    return (
        <>
            <main className="container">
                <h1 className="ion-text-center">Inicie sesion</h1>
                <form className='ion-margin-top'>
                    <IonItem fill="solid" className={`${isValid.cedula && 'ion-valid'} ${isValid.cedula === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Cedula</IonLabel>
                        <IonInput ref={cedula} onIonInput={(event) => validate(event, "cedula")} onIonBlur={() => markTouched("cedula")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.clave && 'ion-valid'} ${isValid.clave === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Contraseña</IonLabel>
                        <IonInput ref={clave} type='password' onIonInput={(event) => validate(event, "clave")} onIonBlur={() => markTouched("clave")}></IonInput>
                    </IonItem>
                    <div className='ion-margin-top'>
                        <IonButton onClick={login}>Iniciar Sesion</IonButton>
                    </div>
                </form>
            </main>
        </>
    )
}

export default IniciarSesionContent;
