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
    },
    {
        path: '/board',
        name: 'board',
        component: () => import('../components/Board.vue')

    },
    {
        path: '/sokoban',
        name: 'sokoban',
        component: () => import('../components/sokoban/index.vue')
    }
];

const routes = allRoutes.slice(1)

export { allRoutes, routes }