// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 分享渠道进入的数据 如果小程序自主进入的话channel为空字符串
    mydata: {
      channel: '',
      shareToken: ''
    },
    post: {
      subject: '',
      content: '',
      userbref: {},
      banners: []
    }
  },
  mutations: {
    updateMyData: (state, newValue) => {
      const obj = state
      obj.mydata = newValue
    },
    updatePost: (state, post) => {
      const obj = state
      obj.post = post
    }

  }
})

export default store
