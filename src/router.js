import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./components/Main'),
    },
    {
      path: '/cart',
      component: () => import('./components/Cart'),
    },
    {
      path: '/account',
      component: () => import('./components/Account'),
    },
  ],
})
