import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/jove.css'
// import './theme/global.scss'


// import Base from 'views/Layout/base.vue'
// import Base from './views/Layout/base.vue';
import store from './store/index.js';
import Avatar from './views/auxiliare/avatar.vue';
import { 
  IonPage, 
  IonTitle, 
  IonContent, 
  IonHeader, 
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonIcon,IonButton,
} from '@ionic/vue'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

// app.component('base-layout', Base)
app.component('ava-tar', Avatar)
app.component('ion-icon', IonIcon)
app.component('ion-button',IonButton)
app.component('ion-page', IonPage)
app.component('ion-content', IonContent)
app.component('ion-page', )
app.component('ion-page', )
app.component('ion-page', )

  
router.isReady().then(() => {
  app.mount('#app');
});