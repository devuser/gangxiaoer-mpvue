// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    mydata: {
      content: '',
      orderSeq: '',
      history: [],
      steps: []
    }
  },
  mutations: {
    updateData: (state, newValue) => {
      const obj = state
      obj.mydata = newValue
    }

  }
})

export default store
