import request from '@/utils/request'

export function getBizQueryConfig(name) {
  return request({
    url: '/config/bizquery',
    method: 'get',
    params: { name }
  })
}

export function fetchDataList(dataUrl, queryParams) {
  return request({
    url: dataUrl,
    method: 'get',
    params: { queryParams }
  })
}

export function sendAction(method, dataUrl, params) {
  return request({
    url: dataUrl,
    method: method,
    params: { params }
  })
}
