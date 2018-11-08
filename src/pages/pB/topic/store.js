// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    topTagList: {
      data: [],
      pageindex: 1,
      pagelen: 20,
      total: 20
    },
    hotTagList: {
      data: [],
      pageindex: 1,
      pagelen: 20,
      total: 20
    },
    tagList: {
      data: [],
      pageindex: 1,
      pagelen: 20,
      total: 20
    },
    pageIndex: 1,
    pageLen: 20,
    total: 20
  },
  mutations: {
    updateTopTagList: (state, newValue) => {
      const obj = state
      obj.topTagList = newValue
    },
    updateHotTagList: (state, newValue) => {
      const obj = state
      obj.hotTagList = newValue
    },
    updateTagList: (state, newValue) => {
      const obj = state
      obj.tagList = newValue
    },
    updatePageIndex: (state, newValue) => {
      const obj = state
      obj.pageIndex = newValue
    },
    updatePageLen: (state, newValue) => {
      const obj = state
      obj.pageLen = newValue
    },
    updateTotal: (state, newValue) => {
      const obj = state
      obj.total = newValue
    }
  }
})

export default store
