import Layout from '@/views/layout/Layout'

const bizQueryRouter = {
  path: '/bizquery',
  component: Layout,
  name: 'BizQuery-DEMO',
  meta: {
    title: '查询',
    icon: 'table'
  },
  children: [{
    path: 'list/:name',
    component: () => import('@/views/bizquery/list'),
    name: 'listDemo',
    meta: {
      title: '[模块]查询',
      noCache: true
    },
    hidden: true
  }]
}
export default bizQueryRouter
