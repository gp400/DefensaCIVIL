import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useHistory } from "react-router";
import NoticiasContent from "../components/NoticiasContent";
import { logOut } from "../redux/loginSlice";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

const Noticias: React.FC = () => {

  const history = useHistory();
  const dispatch = useAppDispatch()
  const { datos } = useAppSelector((state) => state.login);

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
              <IonMenuButton menu={datos.token === "" ? "nologged": "logged"} />
              </IonButtons>
              <IonTitle>Noticias</IonTitle>
              {
                datos.token !== "" && (
                  <IonButtons slot="primary">
                    <IonButton color="danger" onClick={() => {dispatch(logOut())}}>Cerrar Sesion</IonButton>
                  </IonButtons>
                )
              }
            </IonToolbar>
          </IonHeader>
    
          <IonContent fullscreen>
              <NoticiasContent />
          </IonContent>
        </IonPage>
      );
}

export default Noticias
