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
import { accessibilityOutline, accessibilitySharp, addOutline, addSharp, alertCircleOutline, alertCircleSharp, documentOutline, documentSharp, homeOutline, homeSharp, logInOutline, logInSharp, mapOutline, mapSharp, newspaperOutline, newspaperSharp, peopleOutline, peopleSharp, personAddOutline, personAddSharp, starOutline, starSharp, videocamOutline, videocamSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Pagina Principal',
    url: '/',
    iosIcon: starOutline,
    mdIcon: starSharp
  },
  {
    title: 'Historia',
    url: '/historia',
    iosIcon: documentOutline,
    mdIcon: documentSharp
  },
  {
    title: 'Servicios',
    url: '/servicios',
    iosIcon: personAddOutline,
    mdIcon: personAddSharp
  },
  {
    title: 'Noticias',
    url: '/noticias',
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp
  },
  {
    title: 'Videos',
    url: '/videos',
    iosIcon: videocamOutline,
    mdIcon: videocamSharp
  },
  {
    title: 'Albergues',
    url: '/albergues',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Mapa',
    url: '/mapa',
    iosIcon: mapOutline,
    mdIcon: mapSharp
  },
  {
    title: 'Medidas',
    url: '/medidas',
    iosIcon: alertCircleOutline,
    mdIcon: alertCircleSharp
  },
  {
    title: 'Miembros',
    url: '/miembros',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  },
  {
    title: 'Voluntario',
    url: '/voluntario',
    iosIcon: accessibilityOutline,
    mdIcon: accessibilitySharp
  },
  {
    title: 'Acerca De',
    url: '/acercaDe',
    iosIcon: addOutline,
    mdIcon: addSharp
  },
  {
    title: 'Iniciar Sesion',
    url: '/inicioSesion',
    iosIcon: logInOutline,
    mdIcon: logInSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu menuId='nologged' contentId="main" type="overlay">
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
};

export default Menu;
