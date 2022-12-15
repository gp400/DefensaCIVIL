import { IonButton, IonInput, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAppSelector } from "../reduxHooks";

interface ICamposValid {clave_anterior: boolean | null, clave_nueva: boolean | null}
interface ICamposParametros {clave_anterior: string, clave_nueva: string}

export const CambiarClaveContent: React.FC = () => {

    const clave_anterior = useRef<any>(null);
    const clave_nueva = useRef<any>(null);
    const [presentAlert] = useIonAlert();
    const { fetchApiPost } = useFetch();
    const { datos } = useAppSelector((state) => state.login)
    const [isValid, setIsValid] = useState<ICamposValid>({clave_anterior: null, clave_nueva: null});
    const [valores, setValores] = useState<ICamposParametros>({clave_anterior: "", clave_nueva: ""});

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
        setValores({clave_anterior: "", clave_nueva: ""})
        setIsValid({clave_anterior: null, clave_nueva: null})
        clave_anterior.current.value = "";
        clave_nueva.current.value = "";
    }

    const onSubmit = async() => {
        if (isValid.clave_anterior && isValid.clave_nueva){
            let formData = new FormData();
            formData.set("clave_anterior", valores.clave_anterior);
            formData.set("clave_nueva", valores.clave_nueva);
            formData.set("token", datos.token);
            fetchApiPost('https://adamix.net/defensa_civil/def/cambiar_clave.php', formData)
            .then((response) => response.json())
            .then((resp) => {
                if (resp.exito){
                    presentAlert({
                        header: 'Correcto',
                        message: 'Contraseña cambiada correctamente',
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
            if (!isValid.clave_anterior){
                copia.clave_anterior = false;
            }
            if (!isValid.clave_nueva){
                copia.clave_nueva = false;
            }
            setIsValid(copia);
        }
    }

    return (
        <>
            <main className="container">
            <h1 className="ion-text-center">Cambiar Contraseña</h1>
                <form className='ion-margin-top'>
                    <IonItem fill="solid" className={`${isValid.clave_anterior && 'ion-valid'} ${isValid.clave_anterior === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Clave Anterior</IonLabel>
                        <IonInput type="password" ref={clave_anterior} onIonInput={(event) => validate(event, "clave_anterior")} onIonBlur={() => markTouched("clave_anterior")}></IonInput>
                    </IonItem>
                    <IonItem fill="solid" className={`ion-margin-top ${isValid.clave_nueva && 'ion-valid'} ${isValid.clave_nueva === false && 'ion-invalid ion-touched'}`}>
                        <IonLabel position="floating">Clave Nueva</IonLabel>
                        <IonInput type="password" ref={clave_nueva} onIonInput={(event) => validate(event, "clave_nueva")} onIonBlur={() => markTouched("clave_nueva")}></IonInput>
                    </IonItem>
                    <div className='ion-margin-top'>
                        <IonButton onClick={onSubmit}>Guardar</IonButton>
                    </div>
                </form>
            </main>
        </>
    )
}
