import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import getters from './getters'
import quxian from './modules/quxian'
import documentTopMenu from './modules/documentTopMenu'
import hideDanger from './modules/hideDanger'
import evacuationRoute from './modules/evacuationRoute'
import imgMap from './modules/imgMap'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    common,
    logs,
    tags,
    quxian,
    documentTopMenu,
    hideDanger,
    evacuationRoute,
    imgMap
  },
  getters,
})

export default store