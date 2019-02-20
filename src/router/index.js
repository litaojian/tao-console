import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Router Modules */
import testRecRouter from './modules/testRec'
import constantRouter from './constant'

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter
})

export const asyncRouterMap = [
  /** When your routing table is too long, you can split it into small modules**/
  testRecRouter,
  /** default page */
  { path: '*', redirect: '/404', hidden: true },
  { path: '', redirect: '/testRec/list', meta: { title: 'dashboard', icon: 'dashboard', noCache: true }}
]

export const constantRouterMap = constantRouter
