import request from '@/utils/request'

export function getBizFormConfig(name) {
  return request({
    url: '/config/bizquery',
    method: 'get',
    params: { name }
  })
}

export function fetchFormData(dataUrl, queryParams) {
  return request({
    url: dataUrl,
    method: 'get',
    params: { queryParams }
  })
}
