/*
 * @Author: 张峻霖
 * @Date: 2021-03-16 09:58:19
 * @LastEditTime: 2021-03-17 20:04:05
 * @LastEditors: Please set LastEditors
 * @Description: 数据分析界面相关接口
 * @FilePath: \LH-UI\src\api\dataAnalysis\dataAnalysis.js
 */
import request from '@/router/axios';
// 天气接口
export function getWeather(query){
    return request({
        url:'/home/getWeatherProduct',
        method:'GET',
        params: query
    })
}
export function getByDisId(query){
    return request({
        url:'/disaster_layer_data/getByDisId',
        method:'GET',
        params: query
    })
}
