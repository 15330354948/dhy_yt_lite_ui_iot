import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import AvueRouter from './avue-router'
import i18n from '@/lang' // Internationalization
import Store from '../store/'
import {contextpath} from '@/config/env'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)

}

Vue.use(VueRouter)
//创建路由
export const createRouter = () => new VueRouter({
  mode: 'history',
  base: contextpath,
  routes: [...PageRouter, ...ViewsRouter],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
})

const Router = createRouter()
AvueRouter.install(Vue, {
  router: Router,
  store: Store,
  i18n: i18n,
  keepAlive: false,
});
Router.$avueRouter.formatRoutes(Store.state.user.menuAll, true);
Router.addRoutes([...PageRouter, ...ViewsRouter]);

export function resetRouter () {
  const newRouter = createRouter()
  Router.matcher = newRouter.matcher // reset router
  AvueRouter.install(Vue, {
    router: Router,
    store: Store,
    i18n: i18n,
    keepAlive: false,
  });
}
export default Router