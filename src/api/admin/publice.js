/*
 * @Author: 张峻霖
 * @LastEditTime: 2021-03-13 11:16:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\api\admin\publice.js
 */
import request from '@/router/axios'
export function area (id) {
    return request({
      url: '/area/parentId/'+id,
      method: 'get',
    })
  }