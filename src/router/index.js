import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Games.vue')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/CreateGame.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
