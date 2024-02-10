import { createRouter, createWebHistory } from "vue-router";
import Map from "/src/views/map.vue";
import Login from "/src/views/login.vue";
import { checkIsAuthenticated } from "/src/use/useAuth.js";

const routes = [
   {
      path: "/",
      name: "Login",
      component: Login,
   },
   {
      path: "/map",
      name: "Map",
      component: Map,
   },
   {
      path: "/:catchAll(.*)",
      redirect: "/",
   },
];

const router = createRouter({
   history: createWebHistory("/"),
   routes,
});

router.beforeEach(async (to, from) => {
   const isAuthenticated = await checkIsAuthenticated();
   if (isAuthenticated && to.path === "/") {
      return { name: "Map" };
   }
   if ( !isAuthenticated && to.path !== "/" ) {
      // redirect the user to the login page
      return { name: "Login" };
   }
});

export default router;
