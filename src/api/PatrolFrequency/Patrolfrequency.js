import request from '@/router/axios'
export function fetchList(query) {
    return request({
      url: '/disaster/disaster_macro_observe_record/page',
      method: 'get',
      params:query
    })
  }