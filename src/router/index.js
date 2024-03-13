import { createRouter, createWebHistory } from '@ionic/vue-router'
import Signature from '../views/auxiliare/signature.vue'
import Feuille from '../views/Layout/feuille.vue'
import BaseMenu from '../views/Layout/base-menu.vue'
// import Comp from '../views/n_ope/compo.vue'
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
import profileMenu from '../../tmp/profileMenu.vue'
import profile from '../views/operations/profile/profile.vue'
import changePassword from '../views/operations/profile/change-password.vue'
//restructuring the components import globally or locally
//Mar 13, 2024
import LogUser from '../views/welcome/auth/login.vue'

const routes= [
  {
    path: '/',
    redirect: '/lit'
  },
  {
    path :'/signature',
    component : Signature
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
    path : '/hope',
    component: HomP,
  },
  {
    path : '/depot',
    component: Depon
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
    path : '/transfer',
    component : transfer,
  },
  {
    path : '/retrait',
    component: retrait,
  },
  {
    path : '/lit',
    component : Lit
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
    path : '/prof',
    component : profileMenu
  },
  {
    path : '/profile',
    component: profile,
  },
  {
    path : '/chpa',
    component: changePassword
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
