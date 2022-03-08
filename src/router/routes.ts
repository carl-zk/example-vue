import { RouteRecordRaw } from "vue-router";

const allRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/addName'
    },
    {
        path: '/addName',
        name: 'type name and mark',
        component: () => import('../components/AddName.vue')
    },
    {
        path: '/hello',
        name: 'example couter',
        component: () => import('../components/HelloWorld.vue')
    }
];

const routes = allRoutes.slice(1)

export { allRoutes, routes }