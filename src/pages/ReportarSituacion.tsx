import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { Redirect } from "react-router";
import { ReportarSituacionContent } from "../components/ReportarSituacionContent"
import { logOut } from "../redux/loginSlice";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

export const ReportarSituacion: React.FC = () => {

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
              <ReportarSituacionContent />
          </IonContent>
        </IonPage>
    )
}