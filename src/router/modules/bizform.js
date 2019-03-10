import Layout from '@/views/layout/Layout'

const bizQueryRouter = {
  path: '/bizform',
  component: Layout,
  name: 'BizForm-DEMO',
  meta: {
    title: '详情',
    icon: 'form'
  },
  children: [{
    path: 'edit/:id',
    component: () => import('@/views/bizform/form'),
    name: 'formDemo',
    meta: {
      title: '[模块]详情',
      noCache: true
    },
    hidden: true
  },
  {
    path: 'view/:id',
    component: () => import('@/views/bizform/form'),
    name: 'formDemo',
    meta: {
      title: '[模块]详情',
      noCache: true
    },
    hidden: true
  }]
}
export default bizQueryRouter
