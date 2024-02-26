import { createRouter, createWebHistory } from '@ionic/vue-router';
import ConneXion from '../views/connexion.vue'
import Conne from '../views/conne.vue'
import Logi from '../views/logi.vue'
import SignUp from '../views/inscrire.vue'
import Menu from '../views/menu.vue'
import Men from '../views/men.vue'
import List from '../views/listOptions.vue'
import Signature from '../views/signature.vue'
import Depot from '../views/operations/depo.vue'

const routes= [
  {
    path: '/',
    redirect: '/depot'
  },
  {
    path:'/connexion',
    component : ConneXion
  },
  {
    path: '/home',
    component: Conne
  },
  {
    path: '/log',
    component: Logi,
  },
  {
    path: '/signup',
    component: SignUp,
  },
  {
    path : '/menu',
    component: Menu,
  },
  {
    path : '/men',
    component: Men,
  },
  {
    path :'/list',
    component: List,
  },
  {
    path :'/signature',
    component : Signature
  },
  {
    path : '/depot',
    component: Depot,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
