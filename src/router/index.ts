import { createRouter, createWebHashHistory, RouteRecordRaw, RouterLink, RouterView, routerViewLocationKey } from 'vue-router'
import Card from '../components/CardViewer.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'blog',
    component: Card
  },
  {
    path: '/:flag',
    component: Card
  },
  {
    path: '/:flag/:id',
    component: () => import('../components/PageViewer.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
