import { createRouter, createWebHistory } from '@ionic/vue-router'
import Signature from '../views/auxiliare/signature.vue'
import Feuille from '../views/Layout/feuille.vue'
import BaseMenu from '../views/Layout/base-menu.vue'
import HomP from '../views/n_ope/home-op.vue'
import Depon from '../views/operations/principal/depon.vue'
import Login from '../views/welcome/auth/login.vue'
import Registration from '../views/welcome/auth/registr.vue'
// import transfer from '../views/operations/principal/transfer.vue'
import retrait from '../views/operations/principal/retrait.vue'
import Lit from '../views/welcome/homelit.vue'
// import Convert from '../views/operations/principal/conversion.vue'
import Loader from '../views/auxiliare/processing/processing1.vue'

import investAdmin from '../views/operations/principal/invest-admin.vue'

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
  
  // {
  //   path : '/transfer',
  //   component : transfer,
  // },
  {
    path : '/retrait',
    component: retrait,
  },
  
  {
    path : '/histo',
    component : ()=>import('../views/operations/historique/historique.vue')
  },
  // {
  //   path : '/convert',
  //   component : Convert
  // },
  {
    path : '/invest',
    component : ()=>import('../views/operations/principal/invest.vue')
  },
  {
    path : '/profile',
    component: ()=>import('../views/operations/profile/profile.vue')
  },
  {
    path : '/chpa',
    component : ()=> import('../views/operations/profile/change-password.vue')

  },
  {
    path :'/signature',
    component : Signature
  },
  {
    path : '/loader',
    component : Loader
  },
  {
    path : '/invest-admin',
    component: investAdmin,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
