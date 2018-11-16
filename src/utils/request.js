// 引入fly
var Fly = require('flyio/dist/npm/wx')

const request = new Fly()

// 配置请求基地址
const host = 'https://coms.boyosoft.net/gangxiaoer/gapi/v2'
request.config.timeout = 10 * 1000
request.config.baseURL = host

// request.config.baseURL = 'http://127.0.0.1:39090/boyocoms/gangxiaoer/gapi/v2'

request.interceptors.request.use(
  (request) => {
    // 给所有请求添加自定义header
    request.headers['token'] = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中...'
    })
    return request
  }
)

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  }, (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.response.data.msg,
      icon: 'none'
    })
    return promise.resolve()
  }
)

/***
 * 请求数据
 * @param url
 * @param data
 * @param method
 * @returns {FlyPromise<any>}
 */
function getData (url, data, method = 'GET') {
  return request.request(url, data, {
    'method': method
  })
}

async function getPostCategoryList () {
  console.log('getPostCategoryList')
  console.log(request.config.baseURL)
  const res = await request.request({
    method: 'get',
    url: '/postcategory/list',
    body: {}
  })
  console.log(res)
  console.log(res.code)
  console.log(res.data)
  let categoryList = []

  res.data.forEach((item) => {
    console.log(item)
    categoryList.push(item)
  })
  console.log('categoryList: ' + categoryList)
  return categoryList
}

const getPost = (token, postId) => {
  let serverPath = request.config.baseURL
  return new Promise((resolve, reject) => {
    // 拼接完整的url
    let url = serverPath + '/post/detail'
    console.log(url)
    wx.request({
      url: url,
      data: {
        'token': token,
        'postId': postId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        // 把返回的数据传出去
        resolve(res.data)
      },
      fail (ret) {
        // 把错误信息传出去
        reject(ret)
      }
    })
  })
}
const getMySelfPrivateData = (token, pageindex, pagelen) => {
  let serverPath = request.config.baseURL
  return new Promise((resolve, reject) => {
    // 拼接完整的url
    let url = serverPath + '/user/myself/privatedata'
    console.log(url)
    wx.request({
      url: serverPath + '/user/myself/privatedata',
      data: {
        'token': token,
        'pageindex': pageindex,
        'pagelen': pagelen
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        // 把返回的数据传出去
        resolve(res.data)
      },
      fail (ret) {
        // 把错误信息传出去
        reject(ret)
      }
    })
  })
}

const getMyselfAddrList = (token) => {
  let serverPath = request.config.baseURL
  return new Promise((resolve, reject) => {
    // 拼接完整的url
    let url = serverPath + '/user/myself/address/list'
    console.log(url)
    wx.request({
      url: url,
      data: {
        'token': token
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        // 把返回的数据传出去
        resolve(res.data)
      },
      fail (ret) {
        // 把错误信息传出去
        reject(ret)
      }
    })
  })
}

const getPostList = (token, postCategoryId, pageindex, pagelen) => {
  let serverPath = request.config.baseURL
  return new Promise((resolve, reject) => {
    // 拼接完整的url
    let url = serverPath + '/post/list'
    console.log(url)
    wx.request({
      url: url,
      data: {
        'token': token,
        'postCategoryId': postCategoryId,
        'pageindex': pageindex,
        'pagelen': pagelen
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        // 把返回的数据传出去
        resolve(res.data)
      },
      fail (ret) {
        // 把错误信息传出去
        reject(ret)
      }
    })
  })
}
const post = (url, body) => {
  let serverPath = request.config.baseURL
  return new Promise((resolve, reject) => {
    // 拼接完整的url
    wx.request({
      url: serverPath + url,
      data: body,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        // 把返回的数据传出去
        resolve(res.data)
      },
      fail (ret) {
        // 把错误信息传出去
        reject(ret)
      }
    })
  })
}
//
function doSignIn (token) {
  console.log(token)
  return post('/user/myself/signin', {
    token: token
  })
}

async function getTagList (token, tagType, pageIndex, pageLen) {
  console.log('getPostCategoryList')
  console.log(request.config.baseURL)
  const res = await request.request({
    method: 'get',
    url: '/tag/list',
    body: {
      token: token,
      tagType: tagType,
      pagelen: pageLen,
      pageindex: pageIndex
    }
  })
  console.log(`getTagList:${res}`)
  console.log(`getTagList:${res.code}`)
  console.log(res.data)
  let tagList = res.data
  //
  // res.data.forEach((item) => {
  //   console.log(item)
  //   tagList.push(item)
  // })
  console.log('tagList: ' + tagList)
  console.log('tagList.data.length: ' + tagList.data.length)
  return tagList
}

const hitShare = (token, shareToken) => {
  this.$post('/post/share/hit', {
    'token': token,
    'shareToken': shareToken
  }).then((res) => {
    console.log(res)
  })
}
//
export {
  request,
  getData,
  post,
  getTagList,
  host,
  getPost,
  getPostCategoryList,
  getMySelfPrivateData,
  getPostList,
  getMyselfAddrList,
  doSignIn,
  hitShare
}
