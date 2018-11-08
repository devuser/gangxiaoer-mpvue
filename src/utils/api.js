import {
  request,
  host
}
  from '@/utils/request'

export const cstHandUpAction = 'handup'
export const cstHandDownAction = 'handdown'

export function toLogin () {
  const userInfo = wx.getStorageSync('userInfo')
  if (!userInfo) {
    wx.navigateTo({
      url: '/pages/pC/login/main'
    })
  } else {
    return true
  }
}

export function login () {
  const userInfo = wx.getStorageSync('userInfo')
  if (userInfo) {
    return userInfo
  }
}

// ----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------

export function getStorageOpenid () {
  const openId = wx.getStorageSync('openId')
  if (openId) {
    return openId
  } else {
    return ''
  }
}

export const cstAppID = 'wxdccc3a094de0e910'
export const cstAppSecret = 'd1ca7c7d42254bc9f74af4eb6be4c311'
// //user/wxapp/login
export function getOpenid () {
  let targetUrl = request.config.baseURL + '/user/wxapp/login'
  console.log(targetUrl)
  wx.login({
    success: (res) => {
      if (res.code) {
        wx.showToast('发起网络请求')
        wx.request({
          url: targetUrl,
          data: {
            'appid': cstAppID,
            'secret': cstAppSecret,
            'code': res.code,
            'grant_type': 'authorization_code'
          },
          success: (resWxappLogin) => {
            console.log(`data: ${resWxappLogin}`)
            console.log(resWxappLogin)
            console.log(resWxappLogin.data.code)
            if (resWxappLogin.data.code === 0) {
              let openid = resWxappLogin.data.data.openid
              let token = resWxappLogin.data.data.token
              console.log(`openId:${openid}`)
              console.log(`token:${token}`)
              wx.setStorageSync('openid', openid)
              wx.setStorageSync('token', token)
            } else {
              console.log(
                `/user/wxapp/login ${resWxappLogin.data.code}:${resWxappLogin.data.msg}`
              )
              wx.showToast(resWxappLogin.data.msg)
            }
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    },
    fail: () => {},
    complete: () => {}
  })
}

export function registerUser () {
  console.log('registerUser')
  wx.login({
    success: function (res) {
      let code = res.code // 微信登录接口返回的 code 参数，下面注册接口需要用到
      console.log('code=<' + code + '>')
      wx.getUserInfo({
        openIdList: ['selfOpenId'],
        lang: 'zh_CN',
        success: (res) => {
          let userInfo = res.userInfo
          let iv = res.iv
          let encryptedData = res.encryptedData
          //
          console.log(userInfo)
          console.log(iv)
          console.log(encryptedData)
          console.log(res)
          wx.setStorageSync('userInfo', userInfo)
          //
          // // 下面开始调用注册接口
          wx.request({
            url: `${host}/user/wxapp/register/complex`,
            data: {
              code: code,
              encryptedData: encryptedData,
              iv: iv
            }, // 设置请求的 参数
            success: (res) => {
              wx.hideLoading()
            }
          })
        }
      })
    }
  })
}
