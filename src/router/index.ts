import { createRouter, createWebHashHistory, RouteRecordRaw, RouterLink, RouterView, routerViewLocationKey } from 'vue-router'
import Card from '../components/CardViewer.vue'
import Viewer from '../components/PageViewer.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:() => {
      return{
        name:'Card',
        params:{ area: 'Blog', flag: 'all' }
      }
    }
  },
  {
    path: '/Search',
    name: 'search',
    component: () => import('../components/CardSearch.vue')
  },
  {
    path: '/:any',
    redirect:() => {
      return{
        name:'Card',
        params:{ area: 'Blog', flag: 'all' }
      }
    }
  },
  {
    path: '/:area/:flag',
    component: Card,
    name: 'Card'
  },
  {
    path: '/:area/:flag/:id',
    name: 'Viewer',
    component: Viewer
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


const map = new Map<string,Array<string>>([
  ["Blog",["all","C Like","前端","后端"]],
  ["Dogfood",["小日常","奇奇怪怪的图","世界第一的童话","快雪时晴","滑滑乱翻书"]],
])

router.beforeEach((to) => {
  if(to.name!.toString() === 'Card' || to.name!.toString() === 'Viewer'){
    const key = typeof to.params.area === 'string' ? to.params.area : 'undefined';
    if(map.has(key)){
      const val = typeof to.params.flag === 'string' ? to.params.flag : 'undefined';
      if(map.get(key)!.find(elem => elem === val) === undefined){
        return false;
      }
    }
    else{
      return false;
    }
  }
});


export default router
