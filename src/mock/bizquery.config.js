import { param2Obj } from '@/utils'

const queryList = {
  'demo1': {
    'title': 'demo1',
    'dataUrl': '/testRec/list',
    'columns': [
      { 'label': 'ID', name: 'id', type: 'number' },
      { 'label': '发布时间', name: 'timestamp', type: 'datetime', width: '140px' },
      { 'label': '作者', name: 'author', align: 'left', width: '90px' },
      { 'label': '标题', name: 'title', align: 'left', mini_width: '200px', width: '320px' },
      { 'label': '状态', name: 'status', align: 'left', width: '150px' },
      { 'label': '操作', name: 'actions', type: 'actions', align: 'center', mini_width: '200px', width: '200px', buttons: [
        { 'type': 'edit', name: 'edit', label: '编辑', 'hidden': false },
        { 'type': 'delete', name: 'delete', label: '删除', 'hidden': false },
        { 'type': 'print', name: 'view', label: '查看', 'hidden': true },
        { 'type': 'print', name: 'print', label: '打印', 'hidden': true }
      ]
      }
    ]
  },
  'demo2': {
    'title': 'demo2',
    'dataUrl': '/testRec/list',
    'columns': [
      { 'label': 'ID', name: 'id', type: 'number' },
      { 'label': '发布时间', name: 'timestamp', type: 'datetime', width: '140px' },
      { 'label': '作者', name: 'author', align: 'left', width: '90px' },
      { 'label': '标题', name: 'title', align: 'left', mini_width: '200px', width: '320px' },
      { 'label': '状态', name: 'status', align: 'left', width: '150px' },
      { 'label': '操作', name: 'actions', type: 'actions', align: 'center', mini_width: '200px', width: '200px', buttons: [
        { 'type': 'edit', name: 'edit', label: '编辑', 'hidden': false },
        { 'type': 'delete', name: 'delete', label: '删除', 'hidden': false },
        { 'type': 'print', name: 'view', label: '查看', 'hidden': true },
        { 'type': 'print', name: 'print', label: '打印', 'hidden': true }
      ]
      }
    ]
  }
}

export default {
  getConfig: config => {
    const { name } = param2Obj(config.url)
    return {
      config: queryList[name]
    }
  }
}
