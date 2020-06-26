import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
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
      path: "/menu",
      component: () => import('./components/menu'), 
    },
    {
      path: "/address",
      component: () => import('./components/Address')
    }
  ],
})
