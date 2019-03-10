import { param2Obj } from '@/utils'

const formList = {
  'form1': {
    'title': 'demo1',
    'fields': [
      { 'label': 'ID', name: 'id', type: 'number' },
      { 'label': 'Title', name: 'title', type: 'string' },
      { 'label': 'Publish Date', name: 'publish_date', type: 'date' }
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
