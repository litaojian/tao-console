import request from '@/utils/request'

export function getBizFormConfig(name) {
  return request({
    url: '/config/bizform',
    method: 'get',
    params: { name }
  })
}

export function getAction(dataUrl, queryParams) {
  return request({
    url: dataUrl,
    method: 'get',
    params: { queryParams }
  })
}

export function postAction(dataUrl, queryParams) {
  return request({
    url: dataUrl,
    method: 'post',
    params: { queryParams }
  })
}

export function deleteAction(dataUrl, queryParams) {
  return request({
    url: dataUrl,
    method: 'delete',
    params: { queryParams }
  })
}
