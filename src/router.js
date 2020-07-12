import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
    },
    {
      path: '/search',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: '番剧',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: '声优',
          path: '/cv',
          component: () => import('@/views/dashboard/CV'),
        },
        {
          name: '角色',
          path: '/character',
          component: () => import('@/views/dashboard/character'),
        },
        {
          name: '标签',
          path: '/tags',
          component: () => import('@/views/dashboard/Tags'),
        },
      ],
    },
    {
      path: 'comic',
      name: 'comic',
      component: () => import('@/views/dashboard/Comic'),
    },
  ],
})
