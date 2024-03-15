import { createRouter, createWebHistory } from '@ionic/vue-router'
import Signature from '../views/auxiliare/signature.vue'
import Feuille from '../views/Layout/feuille.vue'
import BaseMenu from '../views/Layout/base-menu.vue'
import HomP from '../views/n_ope/home-op.vue'
import Depon from '../views/operations/principal/depon.vue'
import Login from '../views/welcome/auth/login.vue'
import Registration from '../views/welcome/auth/registr.vue'
import transfer from '../views/operations/principal/transfer.vue'
import retrait from '../views/operations/principal/retrait.vue'
import Lit from '../views/welcome/homelit.vue'
import Histo from '../views/operations/historique/historique.vue'
import Convert from '../views/operations/principal/conversion.vue'
import invest from '../views/operations/principal/invest.vue'
import profile from '../views/operations/profile/profile.vue'
import changePassword from '../views/operations/profile/change-password.vue'
// import Loader from '..views/auxiliare/processing/processing1.vue'
import Loader from '../views/auxiliare/processing/processing1.vue'
// import { defineAsyncComponent} from 'vue'

// const changePassword = defineAsyncComponent({
//   loader: () => import('../views/operations/profile/change-password.vue'), // function that returns a Promise resolving to the component definition
// });

const routes= [
  {
    path: '/',
    redirect: '/lit'
  },
  {
    path : '/lit',
    component : Lit
  },
  {
    path : '/logi',
    component: Login,
  },
  {
    path :'/registration',
    component : Registration,
  },
  {
    path : '/hope',
    component: HomP,
  },
  {
    path: '/feuille',
    component: Feuille,
  },
  {
    path : '/base-menu',
    component: BaseMenu,
  },
  
  {
    path : '/depot',
    component: Depon
  },
  
  {
    path : '/transfer',
    component : transfer,
  },
  {
    path : '/retrait',
    component: retrait,
  },
  
  {
    path : '/histo',
    component : Histo,
  },
  {
    path : '/convert',
    component : Convert
  },
  {
    path : '/invest',
    component : invest
  },
  {
    path : '/profile',
    component: profile,
  },
  {
    path : '/chpa',
    component: changePassword,

  },
  {
    path :'/signature',
    component : Signature
  },
  {
    path : '/loader',
    component : Loader
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
