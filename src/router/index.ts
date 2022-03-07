import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import AddNameVue from "../AddName.vue";
import HelloWorldVue from "../components/HelloWorld.vue";
import App from '../App.vue'

const routes: RouteRecordRaw[] = [
  { path: '/addName', component: AddNameVue },
  { path: '/hello', component: HelloWorldVue }
];

const router = createRouter({
  routes,
  history: createWebHashHistory("./"),
});

export default router;
