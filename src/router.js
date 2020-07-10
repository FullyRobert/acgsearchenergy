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
          name: '分类',
          path: '/tags',
          component: () => import('@/views/dashboard/Tags'),
        },
        {
          name: '奇幻系动漫',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: '搞笑系动漫',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: '日常系动漫',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})
