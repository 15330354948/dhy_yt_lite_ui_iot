import 'babel-polyfill'
import 'classlist-polyfill'

import Vue from 'vue'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import AvueFormDesign from '@sscfaith/avue-form-design'
import './permission' // 权限
import './error' // 日志
import './cache'; //页面缓冲
import router from './router/router'
import store from './store'
import {
  loadStyle
} from './util/util'
import * as urls from '@/config/env'
import {
  iconfontUrl,
  iconfontVersion,
  symbolUrl,
  symbolVersion,
} from '@/config/env'
import i18n from './lang' // Internationalization
import * as filters from './filters' // 全局filter
import './styles/common.scss'
import './styles/fonts.scss'
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import vcolorpicker from 'vcolorpicker';

import VueLazyload from 'vue-lazyload';

import BaiduMap from 'vue-baidu-map';
import preventReClick from '@/util/preventReClick.js'

Vue.use(preventReClick)

Vue.use(VueLazyload
  // ,
  // {
  //   preLoad: 1.3,
  //   error: '@/assets/img/nodataBig.png',
  //   loading: '@/assets/img/warn.png',
  //   attempt: 1
  // }
)

// 颜色选择器插件
Vue.use(vcolorpicker)

Vue.prototype.axios = axios;

Vue.use(hljs.vuePlugin);
Vue.use(VueAxios, axios)
Vue.use(router)
Vue.prototype.$bus = new Vue()
Vue.use(AvueFormDesign);
Vue.use(ElementUI, {
  size: 'mini',
  menuType: 'text',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(Avue, {
  size: 'mini',
  menuType: 'text',
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('basicBlock', basicBlock)

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

//加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})
// 阿里字体图标库 Symbol 形式
symbolVersion.forEach(ele => {
  loadStyle(symbolUrl.replace('$key', ele))
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts //注册组件
import chartcom from "./components/chartcom/index"
Vue.component('chart-com', chartcom)
import threecom from "./components/threecom/index"
Vue.component('three-com', threecom)
import mapcom from "./components/mapcom/index"
Vue.component('map-com', mapcom)
