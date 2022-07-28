import request from '@/router/axios'
import Qs from 'qs'

const scope = 'server'

export const loginByUsername = (username, password, code, randomStr, captchaVerification) => {
  const grant_type = 'password'

  return request({
    url: '/oauth/token',
    headers: {
      isToken: false,
      Authorization: 'Basic aHVhc2hhbjpodWFzaGFu',
      grant_type: grant_type,
      code: code,
      randomStr: randomStr,
      password: password,
      captchaVerification: captchaVerification ? captchaVerification : ""
    },
    method: 'post',
    transformRequest: [function (data) {
      return Qs.stringify(data)
    }],
    data: {grant_type, username, scope}
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/oauth/token',
    headers: {
      'isToken': false,
      'Authorization': 'Basic aHVhc2hhbjpodWFzaGFu',
    },
    method: 'post',
    params: {refresh_token, grant_type, scope}
  })
}

export const getUserInfo = () => {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
export const projectIcon = (data) => {
  return request({
    url: 'project/professional_project_management/'+data,
    method: 'get'
  })
}
