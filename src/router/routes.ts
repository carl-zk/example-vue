import { RouteRecordRaw } from "vue-router";
import AddNameVue from "../components/AddName.vue";
import HelloWorldVue from "../components/HelloWorld.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/addName', meta: { hidden: true } },
    { path: '/addName', component: AddNameVue },
    { path: '/hello', component: HelloWorldVue }
];

export { routes }