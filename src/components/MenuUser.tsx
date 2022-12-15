import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { documentOutline, documentSharp, fingerPrintOutline, fingerPrintSharp, mapOutline, mapSharp, newspaperOutline, newspaperSharp, personOutline, personSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Noticias',
        url: '/user/noticias',
        iosIcon: newspaperOutline,
        mdIcon: newspaperSharp
    },
    {
        title: 'Reportar Situacion',
        url: '/user/reportarSituacion',
        iosIcon: documentOutline,
        mdIcon: documentSharp
    },
    {
        title: 'Mis Situaciones',
        url: '/user/misSituaciones',
        iosIcon: personOutline,
        mdIcon: personSharp
    },
    {
        title: 'Mapa de Situaciones',
        url: '/user/mapaSituaciones',
        iosIcon: mapOutline,
        mdIcon: mapSharp
    },
    {
        title: 'Cambiar Contraseña',
        url: '/user/cambiarClave',
        iosIcon: fingerPrintOutline,
        mdIcon: fingerPrintSharp
    },
]

const MenuUser: React.FC = () => {

    const location = useLocation();

    return (
        <IonMenu menuId='logged' contentId="main" type="overlay">
          <IonContent>
            <IonList id="inbox-list">
              <IonListHeader>Defensa Civil</IonListHeader>
              <IonNote></IonNote>
              {appPages.map((appPage, index) => {
                return (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                );
              })}
            </IonList>
          </IonContent>
        </IonMenu>
      );
}

export default MenuUser;