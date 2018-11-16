// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    newTagValue: '',
    post: {
      postId: 0,
      subject: '',
      content: '',
      tags: [],
      postCategoryId: 1
    },
    tempFilePaths: [],
    categoryList: []
  },
  mutations: {
    // 注意更新 post时，把用于标签输入框的值清空
    updatePost: (state, _post) => {
      const obj = state
      obj.post = _post
      obj.newTagValue = ''
      //
    },
    updateCategoryId: (state, categoryId) => {
      const obj = state
      obj.post.postCategoryId = categoryId
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
    },
    updatenewTagValue: (state, newValue) => {
      const obj = state
      obj.newTagValue = newValue
    }
  }
})

export default store
