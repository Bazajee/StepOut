import { createRouter, createWebHistory } from 'vue-router'
import Map from "/src/views/map.vue"
import Login from "/src/views/login.vue"

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/map',
    component: Map,
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router