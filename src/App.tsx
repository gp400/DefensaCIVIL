import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import "./index.css"
import './theme/variables.css';
import Principal from './pages/Principal';
import Historia from './pages/Historia';
import Servicios from './pages/Servicios';
import Noticias from './pages/Noticias';
import Videos from './pages/Videos';
import Albergues from './pages/Albergues';
import Mapa from './pages/Mapa';
import Medidas from './pages/Medidas';
import Miembros from './pages/Miembros';
import AcercaDe from './pages/AcercaDe';
import Voluntario from './pages/Voluntario';
import IniciarSesion from './pages/IniciarSesion';
import MenuUser from './components/MenuUser';
import { useAppSelector } from './reduxHooks';
import { ReportarSituacion } from './pages/ReportarSituacion';
import { MisSituaciones } from './pages/MisSituaciones';
import { MapaSituaciones } from './pages/MapaSituaciones';
import CambiarClave from './pages/CambiarClave';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

setupIonicReact();

const App: React.FC = () => {

  const { datos } = useAppSelector((state) => state.login)

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          { datos.token === "" &&
            <Menu />
          }
          { datos.token !== "" &&
            <MenuUser />
          }
          <IonRouterOutlet id="main">
            <PublicRoutes component={Principal} path="/" exact={true}/>
            <PublicRoutes component={Historia} path="/historia" exact={true}/>
            <PublicRoutes component={Servicios} path="/servicios" exact={true}/>
            <PublicRoutes component={Noticias} path="/noticias" exact={true}/>
            <PublicRoutes component={Videos} path="/videos" exact={true}/>
            <PublicRoutes component={Albergues} path="/albergues" exact={true}/>
            <PublicRoutes component={Mapa} path="/mapa" exact={true}/>
            <PublicRoutes component={Medidas} path="/medidas" exact={true}/>
            <PublicRoutes component={Miembros} path="/miembros" exact={true}/>
            <PublicRoutes component={AcercaDe} path="/acercaDe" exact={true}/>
            <PublicRoutes component={Voluntario} path="/voluntario" exact={true}/>
            <PublicRoutes component={IniciarSesion} path="/inicioSesion" exact={true}/>

            <ProtectedRoutes component={Noticias} path="/user/noticias" exact={true}/>
            <ProtectedRoutes component={ReportarSituacion} path="/user/reportarSituacion" exact={true}/>
            <ProtectedRoutes component={MisSituaciones} path="/user/misSituaciones" exact={true}/>
            <ProtectedRoutes component={MapaSituaciones} path="/user/mapaSituaciones" exact={true}/>
            <ProtectedRoutes component={CambiarClave} path="/user/cambiarClave" exact={true}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
