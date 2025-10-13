import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/login';
import Tabs from './pages/tabs';
import Welcome from './pages/welcome';
import Splash from './pages/splash';
import Game from './pages/Game'

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

import { fadeSlideAnimation } from './Animations/FadeSlide';

setupIonicReact({
  mode: 'md'
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter >
      <IonRouterOutlet animated={true} animation={fadeSlideAnimation}>
        <Route exact path={'/splash'}><Splash /></Route>
        <Route exact path={"/welcome"}><Welcome /> </Route>
        <Route exact path={"/login"}><Login /> </Route>
        <Route path={"/tabs"}><Tabs />
        </Route>
        <Route exact path={"/game"}><Game /> </Route>
        <Route exact path={"/"}>
          <Redirect exact from='/' to="/splash" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
