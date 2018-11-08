// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    post: {
      postId: 0,
      subject: '',
      content: '',
      tags: '',
      postcategoryId: 1
    },
    tempFilePaths: [],
    categoryList: []
  },
  mutations: {
    updatePost: (state, _post) => {
      const obj = state
      obj.post = _post
      //
    },
    updateCategoryId: (state, categoryId) => {
      const obj = state
      obj.post.postcategoryId = categoryId
    },
    updatePostSubject: (state, _postSubject) => {
      const obj = state
      obj.post.subject = _postSubject
    },
    updatePostContent: (state, newValue) => {
      const obj = state
      obj.post.content = newValue
    },
    updatePostTags: (state, newValue) => {
      const obj = state
      obj.post.tags = newValue
    },
    updatecategoryList: (state, _categoryList) => {
      const obj = state
      obj.categoryList = _categoryList
    },
    updatetempFilePaths: (state, newValue) => {
      const obj = state
      obj.tempFilePaths = newValue
    }
  }
})

export default store
