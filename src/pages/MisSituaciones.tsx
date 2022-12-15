import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { Redirect } from "react-router";
import { MisSituacionesContent } from "../components/MisSituacionesContent"
import { logOut } from "../redux/loginSlice";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

export const MisSituaciones: React.FC = () => {

  const dispatch = useAppDispatch();
  const { datos } = useAppSelector((state) => state.login);

  if (datos.token === ""){
    return <Redirect to="/inicioSesion" />
  }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
              <IonMenuButton menu="logged" />
              </IonButtons>
              <IonTitle>Reportar Situacion</IonTitle>
                  <IonButtons slot="primary">
                    <IonButton color="danger" onClick={() => {dispatch(logOut())}}>Cerrar Sesion</IonButton>
                  </IonButtons>
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
              <MisSituacionesContent />
          </IonContent>
        </IonPage>
    )
}
