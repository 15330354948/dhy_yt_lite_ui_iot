/*
 * @Author: 张峻霖
 * @Date: 2021-03-12 17:12:14
 * @LastEditTime: 2021-03-26 21:02:02
 * @LastEditors: Please set LastEditors
 * @Description: 隐患范围接口文件
 * @FilePath: \LH-UI\src\api\hideDanger\scope.js
 */
import request from '@/router/axios';


export function addLayerData(query) {
    return request({
        url: '/disaster_layer_data',
        method: 'put',
        data: query
    })
}

export function getLayerData(query) {
    return request({
        url: '/disaster_layer_data/getByDisId',
        method: 'get',
        params: query
    })
}
