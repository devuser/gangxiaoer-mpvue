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
    <van-cell-group>
        <van-panel title="填写帖子">
            <div v-if="post.postId>0">

                <Label>编号</Label>
                <!-- <input id="post-postPostId-alias" v-model="postPostId" @change="onChangeSubject"/> -->
                <van-field :value="post.postId" id="post-postPostId-alias" v-model="post.postId" placeholder="禁止编辑" :readonly="true" :border="false" @change="onChangeSubject($event,'updatePostId')" :key="post-postId" />
            </div>

            <div>
                <Label>标题</Label>
                <!-- <input id="post-postSubject-alias"  v-model="postSubject" @change="onChangeSubject"/> -->
                <van-field  :value="post.subject" id="post-postSubject-alias" v-model="post.subject" placeholder="请输入标题"  :border="true" @change="onChangeSubject($event,'updatePostSubject')" :key="post-subject" />
            </div>
            <div>
                <Label>正文</Label>
                <textarea :value="post.content"
                :border="true"
                 class="weui-textarea" placeholder="请输入问题的正文内容。" maxlength="500" placeholder-style="color:#b3b3b3;font-size:14px;" style="height: 12rem" @change="handleContentInput" />
        <!-- 正文输入字数统计 -->
        <Label>正文字数</Label>
        <view class="weui-textarea-counter">{{contentLength}}/500</view>

                <!-- <input id="post-postContent-alias" :value="post.content" v-model="post.ontent" @change="onChangeSubject" /> -->
                <!-- <van-field  :value="post.content" id="post-content-alias" v-model="post.content" placeholder="请输入正文"  :border="false" @change="onChangeSubject($event,'updatePostContent')" :key="post-content" /> -->
            </div>

            <div>
                <Label>标签</Label>
                <!-- <input key="post-postTags-alias" :value="post.tags" v-model="postTags" @change="onChangeSubject" /> -->
                <van-field :border="true" :value = "newTagValue" id="post-tags-alias" placeholder="请输入新标签" @change="onChangeNewTagValue($event)" :key="post-tags" />
                <van-button size="small" @click="onAddTag($event)">添加</van-button>
                <block v-for="(tag, tagIndex) in post.tags" :key="tagIndex">
                  <van-tag class="demo-margin-right" round :id="tag.id"
                  :type="tag.tagType"
                  > {{ tag.Tag }} </van-tag>
                </block>
            </div>
        </van-panel>
        <!--
      <van-field
      :value="post.postId"
        placeholder="禁止编辑"
        :readonly="true"
        :border="false"
        @change="onChange"
        :key="post-postId"
      />

      <van-field

        :value="post.subject"
        placeholder="请输入主题"
        :border="false"
        @change="onChange"
        :key="post-subject"
      />
      <van-field
:value="post.content"
        placeholder="请输入正文"
        :border="false"
        @change="onChange"
        :key="post-content"
      />
      <van-field

            v-model="postTags"
        placeholder="请输入逗号分隔的标签"
        :border="false"
        @change="onChange"
        :key="post-tags"
      /> -->
        <van-panel title="分类">
          <!-- <van-button>{{pickedpostCategoryId}}</van-button> -->
            <van-radio-group :value= "pickedpostCategoryId" >
                <van-cell-group>
                    <block v-for="(category,postCategoryId) in categoryList" :key="postCategoryId">
                        <van-cell  @click="onCategoryCellClick($event, category.id)" :key="'<van_cell_'+category.id" :id="'category_cell_'+category.id"  :title="category.categorycn" clickable :data-name="category.id">
                            <label class="radio" :key="category.id">
                              <!-- <van-button>{{category.id.type}}:{{pickedpostCategoryId.type}}</van-button>
                              <van-button>{{(category.id+'') === (pickedpostCategoryId+'')}}</van-button> -->
                                <block v-if="(category.id+'') === (pickedpostCategoryId+'')">
                                  <van-radio :value = "pickedpostCategoryId+''" :id="'category_radio_'+category.id" :name="category.id+''" :@change="onRadioChange"/> {{category.categorycn}}
                                </block>
                                <block v-else>
                                  <van-radio :id="'category_radio_'+category.id" :name="category.id+''" :@change="onRadioChange"/> {{category.categorycn}}
                                </block>
                            </label>
                        </van-cell>
                    </block>
                </van-cell-group>
            </van-radio-group>
            <!-- <van-radio-group @model  = "pickedpostCategoryId">
              <block v-for="(category, postCategoryId) in categoryList" :key="postCategoryId">
                <van-radio :name="category.id"  :id="'sample_'+postCategoryId">单选框 {{postCategoryId}}</van-radio>
              </block>

            </van-radio-group> -->

        </van-panel>
        <van-panel title="上传图片">
          <van-button id="pickupimageFileButton" type="default" size="normal" @click="onPickupImageFile($event)">
            选择图片
          </van-button>
        </van-panel>
        <van-panel>
            <van-button type="default" size="normal" @click="onSubmit">提交</van-button>
            <van-button type="default" size="normal" @click="onCancel">取消</van-button>
        </van-panel>
    </van-cell-group>
</div>

</template>

<script>
// import 'weui/dist/style/weui.css'

import {
  formatTime
}
  from '@/utils/index'
import card from '@/components/card'
// import weui from 'weui/dist/style/weui.css'
import store from './store'
// import wxParse from 'mpvue-wxparse'
export default {
  components: {
    card
    // wxParse
    // BannerSwiper
  },
  data () {
    return {
      logs: [],

      pickedpostCategoryId: '1'
      // post: {
      //   postId: 0,
      //   subject: '',
      //   content: '',
      //   tags: '',
      //   postCategoryId: ''
      // }
    }
  },
  computed: {
    contentLength () {
      console.log(store.state.post)

      if (store.state.post === undefined) {
        return 0
      }
      if (store.state.post.content === undefined) {
        return 0
      }
      return store.state.post.content.length
    },
    // pickedpostCategoryId: {
    //   get() {
    //     let _post = store.state.post
    //     // if (_post.postCategoryId === undefined) {
    //     //   let _postCategoryId = this.$root.$mp.query.postCategoryId
    //     //   return _postCategoryId
    //     // } else {
    //     //   console.log(`store.state.post.postCategoryId: ${_post.postCategoryId}`)
    //     return _post.postCategoryId
    //     // }
    //   },
    //   set(newValue) {
    //     // let _post = store.state.post
    //     console.log(`pickedpostCategoryId set ${newValue}`)
    //     console.log(newValue)
    //     // _post.postCategoryId = newValue
    //     store.commit('updateCategoryId', newValue)
    //   }
    // },
    bNewPost () {
      return (store.state.post.postId === 0)
    },
    newTagValue: {
      get () {
        return store.state.newTagValue
      }
    },
    post: {
      get () {
        return store.state.post
      },
      set (newValue) {
        store.commit('updatePost', newValue)
      }
    },
    categoryList () {
      return store.state.categoryList
    }
  },
  methods: {
    onChangeNewTagValue (event) {
      let _newTagValue = event.mp.detail
      store.commit('updatenewTagValue', _newTagValue)
    },
    onAddTag (event) {
      console.log(event)
      console.log(`onChangeTags:${event.mp.detail}`)

      let _tags = this.post.tags
      let newTag = {'id': _tags.length + 1,
        'Tag': this.newTagValue,
        'tagType': this.$randomTagType()}
      _tags.push(newTag)
      let _post = this.post
      _post.tags = _tags
      console.log(_post)
      console.log(_tags)
      store.commit('updatePost', _post)
    },
    // onRadioChange(event) {
    //   console.log(event)
    //   console.log(event.id)
    //
    //   let postCategoryId = event.mp.detail.Number
    //   console.log(`onRadioChange:${postCategoryId}`)
    //   let _post = this.post
    //   _post.postCategoryId = postCategoryId
    //   console.log(`_post:${_post}`)
    //   console.log(_post)
    //   store.commit('updatePost', _post)
    // },
    onPickupImageFile (event) {
      // let that = this
      console.log(event.mp.detail)
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let tempFilePaths = res.tempFilePaths
          store.commit('updatetempFilePaths', res.tempFilePaths)
          console.log(res.tempFilePaths)
          wx.setStorage({ key: 'add-post-images', data: tempFilePaths })
          wx.setStorage({ key: 'add-post-images-count', data: tempFilePaths.length })
          tempFilePaths.forEach((item, index) => {
            let rawKey = 'add-post-images-' + index
            wx.setStorage({ key: rawKey, data: item })
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
      let _post = store.state.post
      _post.content = value
      store.commit('updatePost', _post)
    },
    onCategoryCellClick (event, id) {
      console.log('onCategoryCellClick')
      console.log(id)
      console.log(event)
      this.pickedpostCategoryId = id
      store.commit('updateCategoryId', id)
    },
    onChangeCategory (event) {
      console.log(`onChangeCategory:${event.mp.detail}`)
      console.log(event)
      let _postCategoryId = event.mp.detail
      let _post = this.post
      this.pickedpostCategoryId = event.mp.detail
      _post.postCategoryId = _postCategoryId

      console.log(_post)
      store.commit('updatePost', _post)
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
      store.commit('updatecategoryList', categoryList)
    },
    // updateCategoryByPost(_post) {
    //   // let _postCategoryId = _post.postCategoryId
    //   // let _categoryList = []
    //   // store.state.categoryList.forEach((category) => {
    //   //   if (category.id === _postCategoryId) {
    //   //     category.checked = true
    //   //   } else {
    //   //     category.checked = false
    //   //   }
    //   //   _categoryList.push(category)
    //   // })
    //   // store.commit('updatecategoryList', _categoryList)
    // },
    // onChange() {
    //   let _post = this.post
    //   _post.subject = this.postSubject
    //   _post.content = this.postContent
    //   _post.postCategoryId = this.postCategoryId
    //   _post.tags = this.postTags
    //   console.log(_post)
    //   store.commit('updatePost', _post)
    // },
    // onClick(_postCategoryId) {
    //   let _post = this.post
    //   _post.postCategoryId = this.postCategoryId
    //   console.log(_post)
    // },
    onChangeSubject (event, action) {
      // let _post = this.post
      // // _post.subject = this.postSubject
      // // _post.content = this.postContent
      // // _post.postCategoryId = this.postCategoryId
      // // _post.tags = this.postTags
      // console.log(_post)
      // // this.post = _post
      console.log(event)
      console.log(action)
      store.commit(action, event.mp.detail)
    },
    onSubmit () {
      // let that = this
      const mergedTags = (tags) => {
        let tagNames = []
        tags.forEach((tag) => {
          tagNames.push(tag.Tag)
        })
        return tagNames.join(';')
      }
      let _post = this.post
      console.log(_post)
      let token = wx.getStorageSync('token')
      if (token === '') {
        this.$getOpenid()
        return
      }
      console.log(`token:${token}`)
      let tagListStr = mergedTags(_post.tags)
      console.log(`tagListStr:${tagListStr}`)
      let body = {
        'token': token,
        'id': _post.postId,
        'postCategoryId': parseInt(_post.postCategoryId),
        'subject': _post.subject,
        'content': _post.content,
        'tags': tagListStr,
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
        let postId = res.data.postId
        let tagIdList = res.data.tagIdList
        console.log(`postId: ${postId}`)
        console.log(`tagIdList: ${tagIdList}`)

        // console.log(res.data.msg)
        // 循环提交每个图片文件，注意携带 postId
        let imageFiles = wx.getStorageSync('add-post-images')
        for (var imageFileIndex in imageFiles) {
          let imageFile = imageFiles[imageFileIndex]
          console.log('imageFile: ' + imageFile)
          console.log('postId: ' + postId)
          let token = wx.getStorageSync('token')
          if (token === '') {
            this.$getOpenid()
            return
          }
          wx.uploadFile({
            url: this.$http.config.baseURL + '/auximage/upload',
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
            } })
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
      // store.commit('updatePost', _post)
    },
    async onGetPostData () {
      let _postCategoryId = this.$root.$mp.query.postCategoryId
      let _postId = this.$root.$mp.query.postId
      console.log(`onGetPostData_postId: ${_postId}`)
      console.log(`onGetPostData_postCategoryId: ${_postCategoryId}`)
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
      store.commit('updatePost', _post)
      // this.updateCategoryByPost(_post)
    },
    initPost (_postCategoryId) {
      let _post = this.post
      _post.subject = ''
      _post.content = ''
      _post.postId = 0
      _post.postCategoryId = _postCategoryId
      _post.tags = []
      console.log(`param _postCategoryId: ${_postCategoryId}`)
      store.commit('updatePost', _post)
      // this.updateCategoryByPost(_post)
    }
  },
  onLoad () {
    //
    // let _that = this
    console.log('onshow')
    // this.pickedpostCategoryId = this.$root.$mp.query.postCategoryId
    let _postCategoryId = this.$root.$mp.query.postCategoryId
    console.log(`param _postCategoryId: ${_postCategoryId}`)
    let _postId = this.$root.$mp.query.postId
    console.log(`param _postId: ${_postId}`)
    if (_postId === '0') {
      this.getCategoryData().then((res) => {
        //
        console.log(res)
        console.log('call initPost with ' + _postCategoryId)
        this.initPost(_postCategoryId)
        // store.commit('updateCategoryId', _postCategoryId)
        console.log('update pickedpostCategoryId with ' + _postCategoryId)
        this.pickedpostCategoryId = _postCategoryId
      })
    } else {
      this.getCategoryData().then((res) => {
        // console.log('results:', resultList)
        this.onGetPostData()
        let _post = store.post
        _post.postCategoryId = _postCategoryId
        this.pickedpostCategoryId = _postCategoryId
        store.commit('updatePost', _post)
        console.log('update pickedpostCategoryId with ' + _postCategoryId)
        // store.commit('updateCategoryId', _postCategoryId)
        this.pickedpostCategoryId = _postCategoryId
      })
    }
  },
  // onLoad () {
  //   //
  //
  // },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>
