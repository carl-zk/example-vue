import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AddNameVue from "../components/AddName.vue";
import HelloWorldVue from "../components/HelloWorld.vue";
import App from '../App.vue'

import { routes } from './routes'

const router = createRouter({
  routes,
  history: createWebHashHistory("./"),
});

export default router;
