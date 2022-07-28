/*
 * @Author: your name
 * @Date: 2021-01-28 16:01:53
 * @LastEditTime: 2021-09-29 14:13:07
 * @LastEditors: 张峻霖
 * @Description: In User Settings Edit
 * @FilePath: \LH-UI\src\config\env.js
 */
// 配置编译环境和线上环境之间的切换

const env = process.env
let platformName = env.VUE_APP_PLATFORM_NAME || "IoT智能监测预警云平台";
let loginPagePath = env.VUE_APP_LOGIN_PAGE_PATH || "login_verifition_lh/index";
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://192.168.0.108:9001"; //余玖龙mj
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://192.168.0.100:9001"; // 刘强
let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://47.105.80.201:9001";
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://139.196.55.8:10134";
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://47.105.88.139:16509";
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://192.168.0.105:9001";
// let baseUrl = env.VUE_APP_BASE_GATEWAY_URL || "http://192.168.0.106:6509";
let contextpath = process.env.VUE_APP_CONTEXT_PATH || '/pt/'
let websoketIoIp = 'https://139.159.189.117:443' //服务器Socket（打包使用）
let mapIP = "http://139.159.189.117:12022/" //地图服务器IP（打包使用）
let moduleIp = "http://36.133.111.13:12022/" //模型服务地址

//阿里图标库 Font class 形式
const iconfontVersion = ['3133010_uzq1douelbt']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`

//阿里字体图标库 Symbol 形式
const symbolVersion = ['2281283_zzj30ezxuh'];
const symbolUrl = `//at.alicdn.com/t/font_$key.js`
//验证码地址
const codeUrl = `${window.location.origin}/code`

export {
  contextpath,
  platformName,
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  symbolUrl,
  symbolVersion,
  codeUrl,
  loginPagePath,
  env,
  websoketIoIp,
  mapIP,
  moduleIp
}
