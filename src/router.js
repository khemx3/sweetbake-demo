import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Main')
    },
    {
      path: '/cart',
      component: () => import('./components/Cart'),
    },
    {
      path: '/account',
      component: () => import('./components/Account'),
    },
    {
      path: "/address",
      component: () => import('./components/Address')
    },
    {
      path: "/upload/:orderId",
      component: () => import('./components/upload')
    }
  ],
})
