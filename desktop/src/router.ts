import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    path: '/app',
    component: () => import('./components/app/AppRoot.vue')
  },
  {
    path: '/clipboard',
    component: () => import('./components/clipboard/ClipboardRoot.vue')
  },
  {
    path: '/palette',
    component: () => import('./components/palette/PaletteRoot.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router