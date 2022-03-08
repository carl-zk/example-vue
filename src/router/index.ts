import { createRouter, createWebHashHistory } from "vue-router";
import { allRoutes } from './routes'

const router = createRouter({
  routes: allRoutes,
  history: createWebHashHistory("./"),
});

router.beforeEach((to, from, next) => {
  console.log('router filter before', from.path)
  next()
})

router.afterEach((to, from) => {
  console.log('router filter after ', to.path)
})

export default router;
