import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/time-tracker',
      name: 'time-tracker',
      component: () => import('./views/TimeTracker.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('./views/TaskPlanner.vue')
    },
    {
      path: '/expense-tracker',
      name: 'expense-tracker',
      component: () => import('./views/ExpenseTracker.vue')
    },
    {
      path: '/relaxer',
      name: 'relaxer',
      component: () => import('./views/Relaxer.vue')
    },
    {
      path: '/charts',
      name: 'charts',
      component: () => import('./views/Charts.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    }
  ]
})
