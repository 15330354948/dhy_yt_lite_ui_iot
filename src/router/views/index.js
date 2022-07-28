/*
 * @Author: your name
 * @Date: 2021-04-19 11:26:26
 * @LastEditTime: 2021-05-10 09:26:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\router\views\index.js
 */
import Layout from '@/page/index/'
export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '数据看板',
    meta: {
      menu: false,
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/wel')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      menu: false,
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/user/info'),
  }, {
    path: 'setting',
    name: '个人设置',
    meta: {
      menu: false,
      i18n: 'setting'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/admin/user/setting')
  }]
}, {
  path: '/projectManage',
  component: Layout,
  redirect: '/projectManage/projectInfo',
  children: [{
    path: 'projectInfo',
    name: '项目信息',
    meta: {
      i18n: 'projectInfo'
    },
    component: () =>
      import('@/views/projectManage/projectInfo'),
  }, {
    path: 'detailInfo',
    name: '项目详情',
    meta: {
      menu: false,
      i18n: 'detailInfo'
    },
    component: () =>
      import('@/views/projectManage/detailInfo'),
  }]
},{
  path: '/sysManage',
  component: Layout,
  // redirect: '/platformStatistics',
  children: [{
    path: "platformStatistics",
    name: '平台统计',
    component:_=>
    import('@/views/monitorManage/projectList/platformStatistics/index')
  }, {
    path: "visualizedConfig",
    name: '平台配置',
    component:_=>
    import('@/views/monitorManage/projectList/visualizedConfig/index')
  }]
}]
