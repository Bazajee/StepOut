import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import Vue3TouchEvents from "vue3-touch-events";
createApp(App)
   .use(router)
   .use(Vue3TouchEvents)
   .mount('#app')