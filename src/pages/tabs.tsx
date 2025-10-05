import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterLink } from '@ionic/react';
import { Redirect, Route,} from 'react-router-dom';
import { home, person, settings, storefront } from 'ionicons/icons';
import { createAnimation } from '@ionic/react';

import { fadeSlideAnimation } from '../Animations/FadeSlide';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

import { useRef } from 'react';

const Tabs: React.FC = () => {

  return (
    <IonTabs>
      <IonRouterOutlet animated={true} animation={fadeSlideAnimation}>
        <Route exact path="/tabs/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/tabs/tab2">
          <Tab2 />
        </Route>
        <Route exact path="/tabs/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/tabs">
          <Redirect exact from="/tabs" to="/tabs/tab1" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon aria-hidden="true" icon={home} />
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon aria-hidden="true" icon={storefront} />
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon aria-hidden="true" icon={person} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;