// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      avatarUrl: ''
    },
    cityName: '全国',
    count: 0,
    keyword: '',
    // 如下数据实际上是当前活动tab的所有数据
    activeTabIndex: 0,
    currentCategoryId: 1,
    postList: [],
    // 总页数
    pagecount: 10,
    // 每页条数
    pagelen: 10,
    // 当前页码
    pageindex: 1
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    changeActive: (state, active) => {
      const obj = state
      obj.active = active
    },
    updatePostList: (state, newPostList, pageindex, pagecount, pagelen) => {
      const obj = state
      obj.postList = newPostList
      obj.pageindex = pageindex
      obj.pagecount = pagecount
      obj.pagelen = pagelen
    },
    updateactiveTabIndex: (state, newValue) => {
      const obj = state
      obj.activeTabId = newValue
    },
    updateCurrentCategoryId: (state, newCategoryId) => {
      const obj = state
      obj.currentCategoryId = newCategoryId
    },
    updateUserInfo: (state, newValue) => {
      const obj = state
      obj.userInfo = newValue
    },
    updateKeyword: (state, newValue) => {
      const obj = state
      obj.keyword = newValue
    }
  }
})

export default store
