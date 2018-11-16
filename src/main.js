import Vue from 'vue'
import {
  request,
  getData,
  post,
  getPostCategoryList,
  getMySelfPrivateData,
  getPostList,
  getPost,
  getMyselfAddrList,
  getTagList,
  doSignIn
}
  from '@/utils/request'
import {
  getOpenid,
  registerUser,
  randomTagType,
  beautifyPostList
}
  from '@/utils/api'
import App from './App'
import Hack from '@/utils/Hack'
// 全局处理重复页面跳转详情初始化,和详情跳详情返回的bug
import MyPlugin from './minxins'
Vue.use(MyPlugin)

// import MpvueRouterPatch from 'mpvue-router-patch'
// Vue.use(MpvueRouterPatch)
Vue.prototype.$http = request
Vue.prototype.$getPostCategoryList = getPostCategoryList
Vue.prototype.$getData = getData
Vue.prototype.$getOpenid = getOpenid
Vue.prototype.$getMySelfPrivateData = getMySelfPrivateData
Vue.prototype.$post = post
Vue.prototype.$getPostList = getPostList
Vue.prototype.$getPost = getPost
Vue.prototype.$registerUser = registerUser
Vue.prototype.$getMyselfAddrList = getMyselfAddrList
Vue.prototype.$getTagList = getTagList
Vue.prototype.$doSignIn = doSignIn
Vue.prototype.$randomTagType = randomTagType
Vue.prototype.$globalData = {
  pagelen: 10
}

Vue.prototype.$beautifyPostList = beautifyPostList

var bus = new Vue()
Vue.prototype.$bus = bus
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(Hack)
const app = new Vue(App)
app.$mount()
// "pages": [
//   "pages/index/main",
//   "pages/addPost/main",
//   "pages/addSuggestion/main",
//   "pages/cart/main",
//   "pages/counter/main",
//   "pages/dashboard/main",
//   "pages/editAddr/main",
//   "pages/logs/main",
//   "pages/my/main",
//   "pages/myPost/main",
//   "pages/topic/main",
//   "pages/viewAddrList/main",
//   "pages/viewPost/main"
// ],
export default {
  // 这个字段走 app.json
  // pages: [
  //   'pages/index/main',
  //   'pages/dashboard/main',
  //   'pages/my/main',
  //   'pages/login/main',
  //   'pages/addPost/main',
  //   'pages/addSuggestion/main',
  //   'pages/cart/main',
  //   'pages/counter/main',
  //   'pages/dashboard/main',
  //   'pages/editAddr/main',
  //   'pages/logs/main',
  //   'pages/my/main',
  //   'pages/myPost/main',
  //   'pages/topic/main',
  //   'pages/viewAddrList/main',
  //   'pages/viewPost/main'
  // ]
  //   //   config: {
  //   //     // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
  //   //     'window': {
  //   //       'backgroundTextStyle': 'light',
  //   //       'navigationBarBackgroundColor': '#fff',
  //   //       'navigationBarTitleText': '博雅塔',
  //   //       'navigationBarTextStyle': 'black'
  //   //     },
  //   //     'tabBar': {
  //   //       'backgroundColor': '#fafafa',
  //   //       'borderStyle': 'white',
  //   //       'selectedColor': '#b4282d',
  //   //       'color': '#666',
  //   //       'list': [{
  //   //         'pagePath': 'pages/index/main',
  //   //         'text': '首页',
  //   //         'iconPath': 'static/images/ic_menu_choice_nor.png',
  //   //         'selectedIconPath': 'static/images/ic_menu_choice_pressed.png'
  //   //       }, {
  //   //         'pagePath': 'pages/topic/main',
  //   //         'iconPath': 'static/images/ic_menu_topic_nor.png',
  //   //         'selectedIconPath': 'static/images/ic_menu_topic_pressed.png',
  //   //         'text': '专题'
  //   //       }, {
  //   //         'pagePath': 'pages/dashboard/main',
  //   //         'text': '看板',
  //   //         'iconPath': 'static/images/ic_menu_sort_nor.png',
  //   //         'selectedIconPath': 'static/images/ic_menu_sort_pressed.png'
  //   //       }, {
  //   //         'pagePath': 'pages/cart/main',
  //   //         'iconPath': 'static/images/ic_menu_shoping_nor.png',
  //   //         'selectedIconPath': 'static/images/ic_menu_shoping_pressed.png',
  //   //         'text': '购物车'
  //   //       }, {
  //   //         'pagePath': 'pages/my/main',
  //   //         'text': '我的',
  //   //         'iconPath': 'static/images/ic_menu_me_nor.png',
  //   //         'selectedIconPath': 'static/images/ic_menu_me_pressed.png'
  //   //       }]
  //   //     }
  //   //   }
  //   // }
}
