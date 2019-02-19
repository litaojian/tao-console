import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/testRec/list',
    method: 'get',
    params: query
  })
}

export function fetchTestRec(id) {
  return request({
    url: '/testRec/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/testRec/pv',
    method: 'get',
    params: { pv }
  })
}

export function create(data) {
  return request({
    url: '/testRec/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/testRec/update',
    method: 'post',
    data
  })
}
