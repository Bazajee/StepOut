import { createRouter, createWebHistory } from 'vue-router'
import Map from "/src/views/map.vue"
import MapTest from "/src/views/maptest.vue"

const routes = [
  {
    path: '/',
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