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
    count: 0,
    active: 0,
    postList: [],
    currentCategoryId: 1
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
    updatePostList: (state, newPostList) => {
      const obj = state
      obj.postList = newPostList
    },
    updateCurrentCategoryId: (state, newCategoryId) => {
      const obj = state
      obj.currentCategoryId = newCategoryId
    },
    updateUserInfo: (state, newValue) => {
      const obj = state
      obj.userInfo = newValue
    }
  }
})

export default store
