/**
 * 全站权限配置
 *
 */
import router from './router/router'
import store from '@/store'
import {validatenull} from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({showSpinner: false})

/**
 * 导航守卫，相关内容可以参考:
 * https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 */
const lockPage = store.getters.website.lockPage; //锁屏页
router.beforeEach((to, from, next) => {
  if(to.fullPath == "/wel/index"){
    store.commit("TOP_MENUS_TYPE",{
        type: true,
        number:Math.random().toString(36).slice(-6),
        path:to.fullPath
    });
  }else{
    store.commit("TOP_MENUS_TYPE",{
        type:false,
        number:Math.random().toString(36).slice(-6),
        path:to.fullPath
    });
  }
  // 缓冲设置
  if (to.meta.keepAlive === true && store.state.tags.tagList.some(ele => {
    return ele.value === to.fullPath
  })) {
    to.meta.$keepAlive = true
  } else {
    NProgress.start()
    if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
      to.meta.$keepAlive = true
    } else {
      to.meta.$keepAlive = false
    }
  }
  const meta = to.meta || {};
  const isMenu = meta.menu === undefined ? to.query.menu : meta.menu;
  // console.log("to", to)
  // console.log("menus:",store.getters.menu)
  // console.log("menusAll:",store.getters.menuAll)
  store.commit('SET_IS_MENU', isMenu === undefined);
  // console.log("---------------",meta)
  if (store.getters.access_token) {
    if (store.getters.isLock && to.path != lockPage) {//如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockPage })
    } else if (to.path === '/login') {//如果登录成功访问登录页跳转到主页
      next({path: '/'})
    } else {
      // NOTE: 当用户角色不存在时，会存在无限请求用户信息接口的问题
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(() => {
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            window.sessionStorage.setItem('projectId',"null")//退出登录清空projectId
            next({path: '/login'})
          })
        })
      } else {
        const value = to.query.src || to.fullPath;
        const label = to.query.name || to.name;
        const meta = to.meta || router.$avueRouter.meta || {};
        const i18n = to.query.i18n;
        if (to.query.target) {
          window.open(value, to.query.target)
          return
        } else if (meta.isTab !== false && !validatenull(value) && !validatenull(label)) {
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            params: to.params,
            query: to.query,
            meta: (() => {
              if (!i18n) {
                return meta
              }
              return {
                i18n: i18n
              }
            })(),
            group: router.$avueRouter.group || []
          });
        }
        next()
      }
    }
  } else {
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done();
  let title = store.getters.tag.label;
  let i18n = store.getters.tag.meta.i18n;
  title = router.$avueRouter.generateTitle(title, i18n)
  //根据当前的标签也获取label的值动态设置浏览器标题
  router.$avueRouter.setTitle(title);
});
