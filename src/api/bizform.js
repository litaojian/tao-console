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

export function postAction(dataUrl, formData) {
  return request({
    url: dataUrl,
    method: 'post',
    params: { formData }
  })
}

export function deleteAction(dataUrl, otherParams) {
  return request({
    url: dataUrl,
    method: 'delete',
    params: { otherParams }
  })
}
