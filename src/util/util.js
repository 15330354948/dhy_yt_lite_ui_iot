import { validatenull } from './validate'
import request from '@/router/axios'
import * as CryptoJS from 'crypto-js'

// 表单序列化
export const serialize = data => {
  let list = []
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}
export const getObjType = obj => {
  var toString = Object.prototype.toString
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data)
  var obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
  delete obj1.close
  var o1 = obj1 instanceof Object
  var o2 = obj2 instanceof Object
  if (!o1 || !o2) { /*  判断不是对象  */
    return obj1 === obj2
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
    // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object
    var t2 = obj2[attr] instanceof Object
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {
      return false
    }
  }
  return true
}
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
  if (status) {
    document.body.className = document.body.className + ' grayMode'
  } else {
    document.body.className = document.body.className.replace(' grayMode', '')
  }
}
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

/**
 *加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }
  document.addEventListener("fullscreenchange", function () {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function () {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function () {
    listen();
  });
  document.addEventListener("msfullscreenchange", function () {
    listen();
  });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true
  Object.keys(a).forEach(ele => {
    const type = typeof (a[ele])
    if (type === 'string' && a[ele] !== b[ele]) result = false
    else if (type === 'object' && JSON.stringify(a[ele]) !== JSON.stringify(b[ele])) result = false
  })
  return result
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = ''
  if (validatenull(dic)) return value
  if (typeof (value) === 'string' || typeof (value) === 'number' || typeof (value) === 'boolean') {
    let index = 0
    index = findArray(dic, value)
    if (index != -1) {
      result = dic[index].label
    } else {
      result = value
    }
  } else if (value instanceof Array) {
    result = []
    let index = 0
    value.forEach(ele => {
      index = findArray(dic, ele)
      if (index != -1) {
        result.push(dic[index].label)
      } else {
        result.push(value)
      }
    })
    result = result.toString()
  }
  return result
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i
    }
  }
  return -1
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
/**
 * 将文件的大小转换成可读性比较好的字符串
 * @param {*} fileSize 文件大小，单位为byte 
 */
export const fileSizeConve = (fileSize) => {
  var size = "";
  if (fileSize < 0.1 * 1024) { //如果小于0.1KB转化成B  
    size = fileSize.toFixed(2) + "B";
  } else if (fileSize < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
    size = (fileSize / 1024).toFixed(2) + "KB";
  } else if (fileSize < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
    size = (fileSize / (1024 * 1024)).toFixed(2) + "MB";
  } else { //其他转化成GB  
    size = (fileSize / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf("\.");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {//当小数点后为00时 去掉小数部分  
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
/**
 * 截取指定长度的部分，剩余部分用三个点代替
 * @param {*} str 源字符串
 * @param {*} len 保留的长度
 */
export const subStr = (str, len) => {
  if (isNaN(len)) {
    len = 10;
  }
  if (str && str.length > len) {
    return str.substr(0, len) + " ...";
  }
  return str;
}
export const FilterNullValue = (obj, fixed = 2) => {
  //检验null和undefined
  if (!obj && obj !== 0/*  && obj !== '' */) {
    return false
  }
  //检验数组
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return false
  }
  //检验对象
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return false
  }

  if (typeof obj === 'number') {
    obj = obj.toFixed(fixed) * 1
  }
  return obj
}

//判断字符串的位置
export const DeterminePosition = (str, cha, num) => {
  console.log(str,cha,num);
  let x = str.indexOf(cha);
  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}
// 经纬度转度分秒
export const ToDegrees = (val) => {
  if (typeof (val) == "undefined" || val == "") {
      return "";
  }
  var i = val.indexOf('.');
  var strDu = i < 0 ? val : val.substring(0, i);//获取度
  var strFen = 0;
  var strMiao = 0;
  if (i > 0) {
      var strFen = "0" + val.substring(i);
      strFen = strFen * 60 + "";
      i = strFen.indexOf('.');
      if (i > 0) {
          strMiao = "0" + strFen.substring(i);
          strFen = strFen.substring(0, i);//获取分
          strMiao = strMiao * 60 + "";
          i = strMiao.indexOf('.');
          strMiao = strMiao.substring(0, i + 4);//取到小数点后面三位
          strMiao = parseFloat(strMiao).toFixed(2);//精确小数点后面两位
      }
  }
  return strDu + "°" + strFen + "'" + strMiao;
}