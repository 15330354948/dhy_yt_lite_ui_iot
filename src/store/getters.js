/*
 * @Author: your name
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-04-26 09:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\store\getters.js
 */
const getters = {
  tag: state => state.tags.tag,
  language: state => state.common.language,
  website: state => state.common.website,
  userInfo: state => state.user.userInfo,
  projectId: state => state.user.projectId,
  colorName: state => state.common.colorName,
  themeName: state => state.common.themeName,
  isShade: state => state.common.isShade,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  screen: state => state.common.screen,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  isMenu: state => state.common.isMenu,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagWel: state => state.tags.tagWel,
  access_token: state => state.user.access_token,
  userId: state => state.user.userId,
  refresh_token: state => state.user.refresh_token,
  expires_in: state => state.user.expires_in, roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  menuId: state => state.user.menuId,
  menu: state => state.user.menu,
  viewConfig: state => state.user.viewConfig,
  menuAll: state => state.user.menuAll,
  logsList: state => state.logs.logsList,
  logsLen: state => state.logs.logsList.length || 0,
  logsFlag: (state, getters) => getters.logsLen === 0,
  isDataAnalysis: state => state.common.isDataAnalysis,
  monitorModStatus: state => state.common.monitorModStatus,
  analysisDetails: state => state.common.analysisDetails,
  dictionaries: state => state.common.dictionaries,
  legendData: state => state.common.legendData,
  legendStatus: state => state.common.legendStatus,
  publicWindowData: state => state.common.publicWindowData,
  layerSelection: state => state.common.layerSelection,
  cavasRefresh: state => state.quxian.cavasRefresh,
  modelTimeChange: state => state.quxian.modelTimeChange,
  viewsTopTranstion: state => state.documentTopMenu.viewsTopTranstion,
  getMenuYujing: state => state.documentTopMenu.getMenuYujing,
  occurWarn: state => state.common.occurWarn,
  rowId: state => state.hideDanger.rowId,
}
export default getters
