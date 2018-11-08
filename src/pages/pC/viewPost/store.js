// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    post: {
      content: '',
      userbref: {}
    }
  },
  mutations: {
    updatePost: (state, post) => {
      const obj = state
      obj.post = post
    }

  }
})

export default store
