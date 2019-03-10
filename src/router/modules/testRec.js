import Layout from '@/views/layout/Layout'

const testRecRouter = {
  path: '/testRec',
  component: Layout,
  redirect: '/testRec/list',
  name: 'TestRec-DEMO',
  meta: {
    title: 'Demo',
    icon: 'table'
  },
  children: [{
    path: 'demo1',
    redirect: '/bizquery/list/demo1',
    name: 'BizTestRec',
    meta: {
      title: 'demo1',
      icon: 'edit'
    }
  },
  {
    path: 'create',
    component: () => import('@/views/testRec/create'),
    name: 'CreateTestRec',
    meta: {
      title: '新增TestRec',
      icon: 'edit'
    }
  },
  {
    path: 'edit/:id(\\d+)',
    component: () => import('@/views/testRec/edit'),
    name: 'EditTestRec',
    meta: {
      title: 'TestRec详情',
      noCache: true
    },
    hidden: true
  },
  {
    path: 'list',
    component: () => import('@/views/testRec/list'),
    name: 'TestRecList',
    meta: {
      title: 'TestRec列表',
      icon: 'list'
    }
  }]
}
export default testRecRouter
