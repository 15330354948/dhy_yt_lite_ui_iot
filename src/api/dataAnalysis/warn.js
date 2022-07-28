/*
 * @Author: your name
 * @Date: 2021-03-29 20:53:38
 * @LastEditTime: 2021-05-27 19:48:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\dataAnalysis\warn.js
 */
import request from '@/router/axios';
// 天气接口
export function warnVisuaList(query){
    return request({
        url:'/device/warnsensor/warnVisuaList',
        method:'GET',
        params: query
    })
}
export function getWarnInfoForWebSocket(query){
    return request({
        url:'/device/warnsensor/getWarnInfoForWebSocket',
        method:'GET',
        params: query
    })
}
export function disaster_macro_observe_record(query){
    return request({
        url:'/disaster/disaster_macro_observe_record/'+query,
        method:'GET',
    })
}