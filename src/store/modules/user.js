import {
  getStore,
  setStore
} from '@/util/store'
import {
  isURL,
  validatenull
} from '@/util/validate'
import {
  getUserInfo,
  loginByUsername,
  logout,
  refreshToken
} from '@/api/login'
import {
  deepClone,
  encryption
} from '@/util/util'
import webiste from '@/const/website'
import {
  getMenu,
  getTopMenu
} from '@/api/admin/menu'

function addPath(ele, first) {
  const menu = webiste.menu
  const propsConfig = menu.props
  const propsDefault = {
    label: propsConfig.label || 'name',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon]
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0
  if (!isChild) ele[propsDefault.children] = []
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children].forEach(child => {
      addPath(child)
    })
  }
}

const user = {
  state: {
    userInfo: {},
    projectId: "",
    permissions: {},
    roles: [],
    menuId: getStore({
      name: 'menuId'
    }) || [],
    menu: getStore({
      name: 'menu'
    }) || [],
    menuAll: getStore({
      name: 'menuAll'
    }) || [],
    expires_in: getStore({
      name: 'expires_in'
    }) || '',
    access_token: getStore({
      name: 'access_token'
    }) || '',
    refresh_token: getStore({
      name: 'refresh_token'
    }) || '',
    userId: getStore({
      name: 'userId'
    }) || '',
    videoPreset: getStore({
      name: 'videoPreset'
    }) || '',
    viewConfig: {}
  },
  actions: {
    // 根据用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'CQ_SZ_DHYHuaShan',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        loginByUsername(user.username, user.password, user.code, user.randomStr, user.captchaVerification).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK'),
            // commit('SET_ACCESS_ID', data.user_id),
            resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const data = res.data.data || {}
          commit('SET_USER_INFO', data)
          // commit('SET_PROJECT_ID', data.projectId)
          //判断是否是初始登录projectId为null还是页面刷新有projectId值
          if(window.sessionStorage.getItem('projectId')!='null'||!window.sessionStorage.getItem('projectId')){
            commit('SET_PROJECT_ID', window.sessionStorage.getItem('projectId'))
          }else{
            commit('SET_PROJECT_ID', data.projectId)
          }
          commit('SET_ROLES', data.roleCodes || [])
          commit('SET_PERMISSIONS', data.permissions || [])
          resolve(data)
        }).catch((err) => {
          reject()
        })
      })
    },
    // 刷新token
    RefreshToken({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.refresh_token).then(response => {
          const data = response.data
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_ACCESS_ID', data.user_id),
            commit('SET_REFRESH_TOKEN', data.refresh_token)
          commit('SET_EXPIRES_IN', data.expires_in)
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_PERMISSIONS', [])
          commit('SET_USER_INFO', {})
          commit('SET_ACCESS_TOKEN', '')
          commit('SET_ACCESS_ID', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_EXPIRES_IN', '')
          commit('SET_ROLES', [])
          commit('SET_VIDEO_PRESET', '')
          commit('SET_MENU', [])
          commit('SET_MENUID', {})
          commit('SET_TAG_LIST', [])
          commit('SET_MENUALL', [])
          commit('DEL_ALL_TAG')
          commit('CLEAR_LOCK')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 注销session
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_PERMISSIONS', [])
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_ACCESS_ID', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_EXPIRES_IN', '')
        commit('SET_ROLES', [])
        commit('SET_VIDEO_PRESET', '')
        commit('SET_MENU', [])
        commit('SET_MENUID', {})
        commit('SET_TAG_LIST', [])
        commit('SET_MENUALL', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_LOCK')
        resolve()
      })
    },
    // 获取顶部系统菜单
    GetTopMenu() {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    // 获取系统菜单
    GetMenu({
      commit
    }, parentId) {
      if (parentId) {
        return new Promise(resolve => {
          getMenu(parentId).then((res) => {
            const data = res.data.data
            let menu = deepClone(data)
            menu.forEach(ele => {
              addPath(ele)
            })
            commit('SET_MENUALL', menu)
            commit('SET_MENU', menu)
            resolve(menu)
          })
        })
      } else {
        return null;
      }
    }

  },
  mutations: {
    SET_ACCESS_ID: (state, id) => {
      setStore({
        name: 'userInfo',
        content: id,
        type: 'session'
      })
      state.userId = id;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_VIEW_CONFIG: (state, viewConfig) => {
      state.viewConfig = viewConfig;
    },
    SET_PROJECT_ID: (state, projectId) => {
      setStore({
        name: 'projectId',
        content: projectId,
        type: 'session'
      })
      state.projectId = projectId;
    },
    SET_VIDEO_PRESET: (state, videoPreset) => {
      setStore({
        name: 'videoPreset',
        content: videoPreset,
        type: 'session'
      })
      state.videoPreset = videoPreset;
    },
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_EXPIRES_IN: (state, expires_in) => {
      state.expires_in = expires_in
      setStore({
        name: 'expires_in',
        content: state.expires_in,
        type: 'session'
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
    },
    SET_MENUID(state, menuId) {
      state.menuId = menuId;
      setStore({
        name: 'menuId',
        content: state.menuId,
        type: 'session'
      })
    },
    SET_MENUALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({
        name: 'menuAll',
        content: state.menuAll
      })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: state.menu
      })
      if (validatenull(menu)) return
      //合并动态路由去重
      let menuAll = state.menuAll;
      menuAll = menuAll.concat(menu).reverse();
      let newMenu = [];
      for (let item1 of menuAll) {
        let flag = true;
        for (let item2 of newMenu) {
          if (item1.label == item2.label || item1.path == item2.path) {
            flag = false;
          }
        }
        if (flag) newMenu.push(item1);
      }
      state.menuAll = newMenu
      setStore({
        name: 'menuAll',
        content: state.menuAll,
        type: 'session'
      })
    },
  }

}
export default user
