/*
 * @Author: your name
 * @Date: 2021-04-19 11:26:26
 * @LastEditTime: 2021-05-10 09:26:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\const\website.js
 */
export default {
  title: 'IoT智能监测预警云平台',
  logo: 'IoT智能监测预警云平台',
  key: 'luohu',   //配置主键,目前用于存储
  indexTitle: process.env.VUE_APP_PLATFORM_NAME || 'IoT智能监测预警云平台',
  infoTitle:  process.env.VUE_APP_PLATFORM_NAME || 'IoT智能监测预警云平台',
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock' ], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  lockPage: '/lock',
  tokenTime: 6000,
  statusWhiteList: [428],
  // 配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: '数据看板',
    value: '/wel/index',
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    iconDefault: 'icon-caidan',
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}
