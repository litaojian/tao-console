import Layout from '@/views/layout/Layout'

const errorLogRouter = {
  path: '/error-log',
  component: Layout,
  redirect: 'noredirect',
  children: [{
    path: 'log',
    component: () => import('@/views/errorLog/index'),
    name: 'ErrorLog',
    meta: {
      title: 'errorLog',
      icon: 'bug'
    }
  }]
}
export default errorLogRouter
