import request from '@/router/axios'

export function getProvinceGisUrl(query) {
    return request({
        url: '/province_level_gis_url/' + query,
        method: 'get'
    })
}
