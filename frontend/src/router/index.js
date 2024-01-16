import { createRouter, createWebHistory } from 'vue-router'
import Map from "/src/views/map.vue"
import Test from "/src/views/test.vue"

const routes = [
  {
    path: '/',
    component: Map,
  },
  {
    path: '/test',
    component: Test,
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