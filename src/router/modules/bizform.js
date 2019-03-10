import Layout from '@/views/layout/Layout'

const bizQueryRouter = {
  path: '/bizform',
  component: Layout,
  name: 'BizForm',
  meta: {
    title: '详情',
    icon: 'form'
  },
  children: [{
    path: ':formname/edit/:rowid',
    component: () => import('@/views/bizform/form'),
    name: 'formEdit',
    meta: {
      title: '[模块]详情',
      noCache: true
    },
    hidden: true
  },
  {
    path: ':formname/view/:rowid',
    component: () => import('@/views/bizform/form'),
    name: 'formView',
    meta: {
      title: '[模块]查看详情',
      noCache: true
    },
    hidden: true
  }]
}
export default bizQueryRouter
