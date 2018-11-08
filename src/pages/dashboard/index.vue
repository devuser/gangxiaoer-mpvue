<style>

.log-list {
    display: flex;
    flex-direction: column;
    padding: 40rpx;
}

.log-item {
    margin: 10rpx;
}

</style>

<template>

<div>

    <van-panel title="热点贴子">

    </van-panel>
    <van-panel title="本站指数">

    </van-panel>
    <!-- <van-panel title="钢材走势">

    </van-panel>
    <van-panel title="钢管走势">

    </van-panel>
    <van-panel title="边角料走势">

    </van-panel>
    <van-panel title="轴承走势">

    </van-panel>
    <van-panel title="垫片走势">

    </van-panel> -->

</div>

</template>

<script>

// import 'weui/dist/style/weui.css'
import {
  formatTime
}
  from '@/utils/index'
// import card from '@/components/card'
// import weui from 'weui/dist/style/weui.css'
// import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {
    // card
    // wxParse
  },
  data () {
    return {
      logs: [],
      post: this.$store.state.post,
      pickedpostcategoryId: '1'
      // post: {
      //   postId: 0,
      //   subject: '',
      //   content: '',
      //   tags: '',
      //   postcategoryId: ''
      // }
    }
  },
  computed: {
    contentLength () {
      console.log(this.$store.state.post)
      if (this.$store.state.post === undefined) {
        return 0
      } else {
        return this.$store.state.post.content.length
      }
    },
    // pickedpostcategoryId: {
    //   get() {
    //     let _post = this.$store.state.post
    //     // if (_post.postcategoryId === undefined) {
    //     //   let _postcategoryId = this.$root.$mp.query.postcategoryId
    //     //   return _postcategoryId
    //     // } else {
    //     //   console.log(`this.$store.state.post.postcategoryId: ${_post.postcategoryId}`)
    //     return _post.postcategoryId
    //     // }
    //   },
    //   set(newValue) {
    //     // let _post = this.$store.state.post
    //     console.log(`pickedpostcategoryId set ${newValue}`)
    //     console.log(newValue)
    //     // _post.postcategoryId = newValue
    //     this.$store.commit('updateCategoryId', newValue)
    //   }
    // },
    bNewPost () {
      return (this.$store.state.post.postId === 0)
    },
    post: {
      get () {
        return this.$store.state.post
      },
      set (newValue) {
        this.$store.commit('updatePost', newValue)
      }
    },
    categoryList () {
      return this.$store.state.categoryList
    }
  },
  methods: {
    // onRadioChange(event) {
    //   console.log(event)
    //   console.log(event.id)
    //
    //   let postcategoryId = event.mp.detail.Number
    //   console.log(`onRadioChange:${postcategoryId}`)
    //   let _post = this.post
    //   _post.postcategoryId = postcategoryId
    //   console.log(`_post:${_post}`)
    //   console.log(_post)
    //   this.$store.commit('updatePost', _post)
    // },
    onPickupImageFile (event) {
      let that = this
      console.log(event.mp.detail)
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let tempFilePaths = res.tempFilePaths
          that.$store.commit('updatetempFilePaths', res.tempFilePaths)
          console.log(res.tempFilePaths)
          wx.setStorage({
            key: 'add-post-images',
            data: tempFilePaths
          })
          wx.setStorage({
            key: 'add-post-images-count',
            data: tempFilePaths.length
          })
          tempFilePaths.forEach((item, index) => {
            let rawKey = 'add-post-images-' + index
            wx.setStorage({
              key: rawKey,
              data: item
            })
          })
        }
      })
    },
    handleTitleInput (e) {
      const value = e.detail.value
      console.log(value)
      // this.data.titleCount = value.length  //计算已输入的标题字数
      // $digest(this)
    },
    handleContentInput (e) {
      const value = e.mp.detail.value
      console.log(value)
      console.log(e)
      let _post = this.$store.state.post
      _post.content = value
      this.$store.commit('updatePost', _post)
    },
    onCategoryCellClick (event, id) {
      console.log('onCategoryCellClick')
      console.log(id)
      console.log(event)
      this.pickedpostcategoryId = id
      this.$store.commit('updateCategoryId', id)
    },
    onChangeCategory (event) {
      console.log(`onChangeCategory:${event.mp.detail}`)
      console.log(event)
      let _postcategoryId = event.mp.detail
      let _post = this.post
      this.pickedpostcategoryId = event.mp.detail
      _post.postcategoryId = _postcategoryId

      console.log(_post)
      this.$store.commit('updatePost', _post)
      this.updateCategoryByPost(_post)
    },
    onSharePost (postId) {
      console.log(`onSharePost with postId<${postId}>`)
    },
    async getCategoryData () {
      const res = await this.$http.request({
        method: 'get',
        url: '/postcategory/list',
        body: {}
      })

      let categoryList = []
      res.data.forEach((_category) => {
        _category.checked = false
        console.log(_category)
        console.log(`category: ${_category}`)
        categoryList.push(_category)
      })
      wx.setStorageSync('categoryList', categoryList)
      this.$store.commit('updatecategoryList', categoryList)
    },
    // updateCategoryByPost(_post) {
    //   // let _postcategoryId = _post.postcategoryId
    //   // let _categoryList = []
    //   // this.$store.state.categoryList.forEach((category) => {
    //   //   if (category.id === _postcategoryId) {
    //   //     category.checked = true
    //   //   } else {
    //   //     category.checked = false
    //   //   }
    //   //   _categoryList.push(category)
    //   // })
    //   // this.$store.commit('updatecategoryList', _categoryList)
    // },
    // onChange() {
    //   let _post = this.post
    //   _post.subject = this.postSubject
    //   _post.content = this.postContent
    //   _post.postcategoryId = this.postcategoryId
    //   _post.tags = this.postTags
    //   console.log(_post)
    //   this.$store.commit('updatePost', _post)
    // },
    // onClick(_postcategoryId) {
    //   let _post = this.post
    //   _post.postcategoryId = this.postcategoryId
    //   console.log(_post)
    // },
    onChangeSubject (event, action) {
      // let _post = this.post
      // // _post.subject = this.postSubject
      // // _post.content = this.postContent
      // // _post.postcategoryId = this.postcategoryId
      // // _post.tags = this.postTags
      // console.log(_post)
      // // this.post = _post
      console.log(event)
      console.log(action)
      this.$store.commit(action, event.mp.detail)
    },
    onSubmit () {
      // let that = this
      let _post = this.post
      console.log(_post)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      console.log(`token:${token}`)
      let body = {
        'token': token,
        'id': _post.postId,
        'postcategoryId': parseInt(_post.postcategoryId),
        'subject': _post.subject,
        'content': _post.content,
        'tags': _post.tags,
        'mainimage': '',
        'auximages': '',
        'dateAdd': '',
        'dateUpdate': ''
      }
      console.log(body)
      this.$http.request({
        method: 'POST',
        url: '/post/add',
        body: body
      }).then((res) => {
        console.log(res)
        // console.log(res.code)
        let postId = res.data
        // console.log(res.data.msg)
        // 循环提交每个图片文件，注意携带 postId
        let imageFiles = wx.getStorageSync('add-post-images')
        for (var imageFileIndex in imageFiles) {
          let imageFile = imageFiles[imageFileIndex]
          console.log('imageFile: ' + imageFile)
          let token = wx.getStorageSync('token')
          if (token === '') {
            this.$getOpenid()
            return
          }
          wx.uploadFile({
            url: this.$http.config.baseURL + 'upload',
            filePath: imageFile,
            name: 'upload[]',
            formData: {
              'token': token,
              'postId': postId
            },
            success: function (res) {
              console.log(res)
              // TODO:触发index页面刷新
              wx.navigateBack({
                delta: -1
              })
            }
          })
        }
        /// ///////////////////////
      }).catch((e) => {
        console.log(e)
        wx.navigateBack({
          delta: -1
        })
      })
      /// //////////////////////////////////
    },
    /// /////////////////////////////////

    onCancel () {
      console.log('onCancel')
      let _post = this.post
      console.log(_post)
      _post.postId = 0
      _post.subject = ''
      _post.content = ''
      _post.tags = ''

      // let pages = getCurrentPages()
      // let currPage = pages[pages.length - 1] // 当前页面
      // let prevPage = pages[pages.length - 2] // 上一个页面
      //
      // // 直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
      // prevPage.setData({
      //   data: data
      // })
      wx.navigateBack({
        delta: 1
      })
      // this.$store.commit('updatePost', _post)
    },
    async onGetPostData () {
      let _postcategoryId = this.$root.$mp.query.postcategoryId
      let _postId = this.$root.$mp.query.postId
      console.log(`onGetPostData_postId: ${_postId}`)
      console.log(`onGetPostData_postcategoryId: ${_postcategoryId}`)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      const res = await this.$http.request({
        method: 'get',
        url: '/post/detail',
        body: {
          'token': token,
          'postId': _postId
        }
      })
      console.log(res)
      console.log(res.code)
      console.log(res.data)
      let _post = this.post
      _post.subject = res.data.subject
      _post.content = res.data.content
      _post.tags = res.data.tags
      this.$store.commit('updatePost', _post)
      // this.updateCategoryByPost(_post)
    },
    initPost (_postcategoryId) {
      let _post = this.post
      _post.postId = 0
      _post.postcategoryId = _postcategoryId
      _post.tags = ''
      console.log(`param _postcategoryId: ${_postcategoryId}`)
      this.$store.commit('updatePost', _post)
      // this.updateCategoryByPost(_post)
    }
  },
  onShow () {
    //
    // let _that = this
    console.log('onshow')
    // // this.pickedpostcategoryId = this.$root.$mp.query.postcategoryId
    // let _postcategoryId = this.$root.$mp.query.postcategoryId
    // console.log(`param _postcategoryId: ${_postcategoryId}`)
    // let _postId = this.$root.$mp.query.postId
    // console.log(`param _postId: ${_postId}`)
    // if (_postId === '0') {
    //   this.getCategoryData()
    //
    //   //
    //   // console.log(res)
    //   console.log('call initPost with ' + _postcategoryId)
    //   this.initPost(_postcategoryId)
    //   // this.$store.commit('updateCategoryId', _postcategoryId)
    //   console.log('update pickedpostcategoryId with ' + _postcategoryId)
    //   this.pickedpostcategoryId = _postcategoryId
    // } else {
    //   this.getCategoryData()
    //   // console.log('results:', resultList)
    //   this.onGetPostData()
    //   let _post = this.$store.post
    //   _post.postcategoryId = _postcategoryId
    //   this.pickedpostcategoryId = _postcategoryId
    //   this.$store.commit('updatePost', _post)
    //   console.log('update pickedpostcategoryId with ' + _postcategoryId)
    //   // this.$store.commit('updateCategoryId', _postcategoryId)
    //   this.pickedpostcategoryId = _postcategoryId
    // }
  },
  onLoad () {
    //

  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
