import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

/* Router Modules */
import testRecRouter from './modules/testRec'
import errorLogRouter from './modules/errorLog'
import constantRouter from './constant'

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})

export const asyncRouterMap = [
  testRecRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () => import('@/views/errorPage/401'),
      name: 'Page401',
      meta: {
        title: 'page401',
        noCache: true
      }
    },
    {
      path: '404',
      component: () => import('@/views/errorPage/404'),
      name: 'Page404',
      meta: {
        title: 'page404',
        noCache: true
      }
    }]
  },
  errorLogRouter,
  /** When your routing table is too long, you can split it into small modules**/
  { path: '*', redirect: '/404', hidden: true }
]

export const constantRouterMap = constantRouter
