/*
 * @Author: 张峻霖
 * @Date: 2021-05-19 16:29:40
 * @LastEditTime: 2021-05-19 17:20:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\statisticalReport\monitoringReport.js
 */
import Qs from 'qs'

import request from '@/router/axios'
export function tabelReportmonitor(query) {
    return request({
        url: '/disaster/reportmonitor/page',
        method: 'get',
        params: query
    })
}
export function addReportmonitor(query) {
    return request({
        url: '/disaster/reportmonitor',
        method: 'post',
        data: query
    })
}
export function delReportmonitor(query) {
    return request({
        url: '/disaster/reportmonitor',
        method: 'DELETE',
        paramsSerializer(params) {
            return Qs.stringify(params, {
                arrayFormat: 'repeat'
            })
        },
        params: query
    })
  }