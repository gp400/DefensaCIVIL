import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { Redirect } from 'react-router';
import { CambiarClaveContent } from '../components/CambiarClaveContent';
import { logOut } from '../redux/loginSlice';
import { useAppDispatch, useAppSelector } from '../reduxHooks';

const CambiarClave: React.FC = () => {

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
        <IonTitle>Cambiar Contraseña</IonTitle>
        <IonButtons slot="primary">
          <IonButton color="danger" onClick={() => {dispatch(logOut())}}>Cerrar Sesion</IonButton>
        </IonButtons>
    </IonToolbar>
    </IonHeader>

    <IonContent fullscreen>
        <CambiarClaveContent/>
    </IonContent>
</IonPage>
  );
}

export default CambiarClave;
