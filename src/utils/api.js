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
export function randomTagType () {
  let tagTypes = ['danger', 'primary', '']
  let index = randomNum(0, tagTypes.length)
  return tagTypes[index]
}
// 生成从minNum到maxNum的随机数
function randomNum (minNum, maxNum) {
  let rlt = 0
  switch (arguments.length) {
    case 1:
      rlt = parseInt(Math.random() * minNum + 1, 10)
      break
    case 2:
      rlt = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      break
    default:

      break
  }
  return rlt
}

export const cstAppID = 'wxdccc3a094de0e910'
// TODO: 怎么在上传GitHub前屏蔽
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
              let openId = resWxappLogin.data.data.openId
              let token = resWxappLogin.data.data.token
              console.log(`openId:${openId}`)
              console.log(`token:${token}`)
              wx.setStorageSync('openId', openId)
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

export function beautifyPostList (rawPostList) {
  let _postList = []
  rawPostList.forEach((itm) => {
    if (itm.stick) {
      itm.cardTag = '置顶'
    } else {
      if (itm.recommend) {
        itm.cardTag = '内推'
      }
    }
    _postList.push(itm)
  })
  return _postList
}

/**
 * 榜单：
 * Top 250：
 *  接口地址: top250
 *  要求权限：movie_basic_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 北美票房榜：
 *  接口地址：us_box
 *  要求权限：movie_basic_r
 *
 * 正在上映：
 *  接口地址: in_theaters
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {count} count=20 获取数量
 *    @params {string} city=北京 城市
 *
 * 即将上映：
 *  接口地址: coming_soon
 *  要求权限：movie_premium_r
 *  可传参数：
 *    @params {number} start=0 开始索引
 *    @params {number} count=20 获取数量
 *
 * 口碑榜 -> weekly （movie_advance_r）
 * 新片榜 -> new_movies（movie_advance_r）
 */
export function getBoardData ({
  board = 'top250', page = 1, count = 20, city = '北京', search = ''
} = {}) {
  let params = {}
  if (board !== 'us_box') {
    params.start = (page - 1) * count
    params.count = count
  }
  if (board === 'in_theaters') {
    params.city = city
  }
  if (board === 'search') {
    params.q = search
  }
  return request.get(`/${board}`, params)
}

/**
 * 获取电影条目信息：
 *  接口地址: subject/:id
 *  要求权限：movie_basic_r
 *  可传参数：
 *    @params {number} id 电影id
 */
export function getMovieData (id) {
  return request.get(`/subject/${id}`)
}
