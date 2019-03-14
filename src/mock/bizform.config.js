import { param2Obj } from '@/utils'

const formList = {
  'testRec': {
    'restUrl': '/testRec',
    'title': 'testRec',
    'rules': {
      'title': [{ required: true, message: '请输入标题' }]
    },
    'formLayout': [
      [
        { 'label': '标题', name: 'title', type: 'string', colspan: 12 },
        { 'label': '序号', name: 'id', type: 'number', colspan: 12 }
      ],
      [
        { 'label': '状态', name: 'status', type: 'select', value: '1', options: [{ label: '选项1', value: 'close' }, { label: '草稿', value: 'draft' }] },
        { 'label': '重要性', name: 'important', type: 'select', placeholder: '重要性', dataUrl: '/api/datadict/abc' }
      ],
      [
        { 'label': '选项', name: 'resource', type: 'radio', options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }] },
        { 'label': '能力', name: 'options', type: 'checkbox', options: [{ label: '能力1', value: 1 }, { label: '能力2', value: 2 }] }
      ],
      [
        { 'label': '发布日期', name: 'publish_date', type: 'date' },
        { 'label': '结束日期', name: 'finish_date', type: 'date' }
      ]
    ]
  }
}

export default {
  getConfig: config => {
    const { name } = param2Obj(config.url)
    return {
      config: formList[name]
    }
  }
}
