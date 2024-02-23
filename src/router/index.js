import { createRouter, createWebHistory } from '@ionic/vue-router';
// import TabsPage from '../views/TabsPage.vue'
import ConneXion from '../views/connexion.vue'
import Conne from '../views/conne.vue'
import Logi from '../views/logi.vue'
import SignUp from '../views/inscrire.vue'
import Menu from '../views/menu.vue'
import Men from '../views/men.vue'
import List from '../views/listOptions.vue'

const routes= [
  {
    path: '/',
    redirect: '/list'
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
