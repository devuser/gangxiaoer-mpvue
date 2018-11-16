// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    keyword: '',
    mydata: {
      postList: [],
      pageindex: 1,
      pagecount: 1,
      pagelen: 10,
      banners: []
    }
  },
  mutations: {
    updateMyData: (state, newValue) => {
      const obj = state
      obj.mydata = newValue
    },
    updateKeyword: (state, newValue) => {
      const obj = state
      obj.keyword = newValue
    }
  }
})

export default store
